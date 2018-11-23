import { Room, Client, EntityMap } from 'colyseus';
import * as actions from './utils/actions';
import { A } from './utils/actions';

import { State } from './state';

export class BattleRoom extends Room<State> {
  onInit(options) {
      console.log('onInit', options);
      this.setState(new State());
  }

  onJoin(client) {
      this.state.createPlayer(client.sessionId);
  }

  onLeave(client) {
      this.state.removePlayer(client.sessionId);
  }

  onMessage(client, action) {
      const { type, payload } = action;
      switch (type) {
            case 'KeyDown':
            this.broadcast({
                type,
                payload: {
                    ...payload,
                    id: client.sessionId,
                },
            });
            break;
            case 'KeyUp':
            this.broadcast({
                type,
                payload: {
                    ...payload,
                    id: client.sessionId,
                },
            });
            break;
        }
  }

  onDispose() {
      console.log('Dispose StateHandlerRoom');
  }

}