import { Room, Client } from 'colyseus';
import * as actions from './utils/actions';

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
    onMessage(client: Client, message: any) { }

    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    onDispose() { }
}