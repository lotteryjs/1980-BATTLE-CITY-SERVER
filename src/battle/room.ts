import { Room, Client, EntityMap } from 'colyseus';
import * as actions from './utils/actions';
import { A } from './utils/actions';

// import { State } from './state';

interface IPlayer {
  // 玩家请求的指令
  actionTypes: string[];
  // 玩家🤖坐标 server 端确认
  botSpawnPos: {
    x: number,
    y: number,
  };
  aiModeRandom: number;
}

const players: EntityMap<IPlayer> = {};

// Server 已经完成了的 Action;
const completedActions = [];

/**
 * 同步服务器 action
 */
function syncServerAction(client) {
  // 遍历服务器已经分发过的 action
  for (let i = 0; i < completedActions.length; i++) {
    const action = completedActions[i];
    // 简单检测 client 是否与 server 的 Action 同步情况
    if (!players[client.sessionId].actionTypes[i]) {
      // sync
      players[client.sessionId].actionTypes.push(action.type);
      // send msg
      this.send(client, action);
      break;
    }
  }
}

/**
 * clients 是否已经准备好了
 */
function isReady(cb) {
  const result = Object.keys(players).filter(cb);
  return result.length === 2;
}

export class BattleRoom extends Room {

    maxClients: 2;

    // When room is initialized
    onInit(options: any) {
      console.log('BattleRoom created!', options);
      // this.setState(new State());
    }

    // Authorize client based on provided options before WebSocket handshake is complete
    onAuth(options: any) {
      return true;
    }

    // Checks if a new client is allowed to join. (default: `return true`)
    requestJoin(options: any, isNew: boolean) {
      return true;
    }

    // When client successfully join the room
    onJoin(client: Client) {
      const action = actions.startGame(0);
      // 初始化当前客户端的状态
      players[client.sessionId] = {
        actionTypes: [],
        botSpawnPos: {
          x: -1,
          y: -1,
        },
        aiModeRandom: -1,
      };
      // 服务器是否已经分发了 A.StartGame
      if (completedActions.length) {
        syncServerAction.bind(this)(client);
      } else {
        if (this.clients.length === 2) {
          this.broadcast(action);
          // 每个 client 记录下action
          Object.keys(players).forEach((sessionId: string, index: number) => {
            players[sessionId].actionTypes.push(A.StartGame);
          });
          // server 记录下action
          completedActions.push(action);
        }
      }
    }

    // When a client leaves the room
    onLeave(client: Client, consented: boolean) {
      // this.state.removePlayer(client.sessionId);
      delete players[client.sessionId];
    }

    // When a client sends a message
    onMessage(client: Client, message: any) {
      const { type, payload } = message;
      // 当前玩家
      const player = players[client.sessionId];
      if (completedActions.length > player.actionTypes.length) {
        syncServerAction.bind(this)(client);
        return;
      }
      switch (type) {
        // 产生机器人坐标
        case 'BOTSPAWNPOS':
          // 客户端传过来的 x, y 坐标
          player.botSpawnPos = payload;
          // 是否已经接受完当前所有 client 的 BOTSPAWNPOS 请求
          if (isReady(sessionId => players[sessionId].botSpawnPos.x !== -1)) {
            // 分发最后一个玩家客户端产生🤖坐标
            const action = {
              type,
              payload,
            };
            this.broadcast(action);
            // 记录服务器分发过的 action
            completedActions.push(action);
            // reset
            Object.keys(players).forEach(sessionId => {
              players[sessionId].botSpawnPos = { x: -1, y: -1 };
              players[sessionId].actionTypes.push(type);
            });
          }
          break;
        case 'AIModeRandom':
          player.aiModeRandom = payload;
          const cb = sessionId => players[sessionId].aiModeRandom !== -1;
          if (isReady(cb)) {
            const action = { type, payload };
            this.broadcast(action);
            completedActions.push(action);
            Object.keys(players).forEach(sessionId => {
              players[sessionId].aiModeRandom = -1;
              players[sessionId].actionTypes.push(type);
            });
            console.log(action);
          }
          break;
      }
    }

    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    onDispose() {
      console.log('Dispose StateHandlerRoom');
    }
}