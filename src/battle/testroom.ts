import { Room, Client } from 'colyseus';
import { newStore } from './utils/store';

export class TestRoom extends Room {

    store: any;

    // Authorize client based on provided options before WebSocket handshake is complete
    onAuth(options: any) {
      return true;
    }

    // When room is initialized
    onInit(options: any) {
      this.store = newStore();
      this.store.subscribe(() => {
        // console.log(this.store.getState());
        this.broadcast( this.store.getState() );
      });
    }

    // Checks if a new client is allowed to join. (default: `return true`)
    requestJoin(options: any, isNew: boolean) {
      return true;
    }

    // When client successfully join the room
    onJoin(client: Client) {
      console.log(client.sessionId);
    }

    // When a client leaves the room
    onLeave(client: Client, consented: boolean) { }

    // When a client sends a message
    onMessage(client: Client, message: any) { }

    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    onDispose() { }
}