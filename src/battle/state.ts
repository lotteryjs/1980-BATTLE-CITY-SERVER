import { EntityMap } from 'colyseus';

export class State {
    players: EntityMap<Player> = {};

    createPlayer(id: string) {
        this.players[ id ] = new Player();
    }

    removePlayer(id: string) {
        delete this.players[ id ];
    }
}

export class Player {}