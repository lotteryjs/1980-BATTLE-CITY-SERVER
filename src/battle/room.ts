import { Room, Client, EntityMap } from 'colyseus';
import * as actions from './utils/actions';
import { A } from './utils/actions';

import { State } from './state';

export class BattleRoom extends Room<State> {
  onInit(options) {
      console.log('BattleRoom created!', options);

      this.setState(new State());
  }

  onJoin(client) {
      this.state.createPlayer(client.sessionId);
  }

  onLeave(client) {
      this.state.removePlayer(client.sessionId);
  }

  onMessage(client, data) {
      console.log('StateHandlerRoom received message from', client.sessionId, ':', data);
      this.state.movePlayer(client.sessionId, data);
  }

  onDispose() {
      console.log('Dispose StateHandlerRoom');
  }

}