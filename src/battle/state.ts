import { EntityMap, nosync } from 'colyseus';

export class State {
    players: EntityMap<Player> = {};

    @nosync
    something = 'This attribute won\'t be sent to the client-side';

    createPlayer(id: string) {
        this.players[ id ] = new Player();
    }

    removePlayer(id: string) {
        delete this.players[ id ];
    }

    movePlayer(id: string, movement: any) {
        if (movement.x) {
            this.players[ id ].x += movement.x * 10;

        } else if (movement.y) {
            this.players[ id ].y += movement.y * 10;
        }
    }
}

export class Player {
    x = Math.floor(Math.random() * 400);
    y = Math.floor(Math.random() * 400);
}