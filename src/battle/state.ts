import { EntityMap, nosync } from 'colyseus';

export class State {
    players: EntityMap<Player> = {};

    @nosync
    something = 'This attribute won\'t be sent to the client-side';

    createPlayer(id: string) {
        console.log('createPlayer');
        this.players[ id ] = new Player();
    }

    removePlayer(id: string) {
        delete this.players[ id ];
    }

    clientsController(id: string, action: any) {
        // if (movement.x) {
        //     this.players[ id ].x += movement.x * 10;

        // } else if (movement.y) {
        //     this.players[ id ].y += movement.y * 10;
        // }
    }
}

export class Player {}