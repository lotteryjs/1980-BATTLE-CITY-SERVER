import { Room, Client } from 'colyseus';
import * as actions from './utils/actions';

// 机器人产生坐标
const botSpawnPos = [];
export class BattleRoom extends Room {

    store: any;

    // Authorize client based on provided options before WebSocket handshake is complete
    onAuth(options: any) {
      return true;
    }

    // When room is initialized
    onInit(options: any) {
      console.log('onInit');
    }

    // Checks if a new client is allowed to join. (default: `return true`)
    requestJoin(options: any, isNew: boolean) {
      return true;
    }

    // When client successfully join the room
    onJoin(client: Client) {
      if (this.clients.length === 2) {
        this.broadcast(actions.startGame(0));
      }
    }

    // When a client leaves the room
    onLeave(client: Client, consented: boolean) { }

    // When a client sends a message
    onMessage(client: Client, message: any) {
      const { type, payload } = message;
      switch (type) {
        // 产生机器人坐标
        case 'BOTSPAWNPOS':
          botSpawnPos.push(payload);
          if (botSpawnPos.length === 2) {
            // 分发第一个玩家产生的坐标
            this.broadcast({
              type: 'BOTSPAWNPOS',
              payload: {
                x: botSpawnPos[0].x,
                y: botSpawnPos[0].y,
              },
            }),
            botSpawnPos.length = 0;
          }
          break;
      }
    }

    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    onDispose() { }
}