import { Room, Client } from 'colyseus';
import store from './utils/store';

export class TestRoom extends Room {
    // Authorize client based on provided options before WebSocket handshake is complete
    onAuth(options: any) {
      return true;
    }

    // When room is initialized
    onInit(options: any) {
      // tslint:disable-next-line:no-console
      store.subscribe(() => {
        console.log(store.getState());
      })
    }

    // Checks if a new client is allowed to join. (default: `return true`)
    requestJoin(options: any, isNew: boolean) {
      return true;
    }

    // When client successfully join the room
    onJoin(client: Client) { }

    // When a client leaves the room
    onLeave(client: Client, consented: boolean) { }

    // When a client sends a message
    onMessage(client: Client, message: any) { }

    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    onDispose() { }
}