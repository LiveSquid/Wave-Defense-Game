export const states = {
    walkLeft: 0,
    walkRight: 1,
}

class State  {
    constructor(state, game) {
        this.state = state;
        this.game = game;
    }
}

export class walkLeft extends State {
    constructor(game) {
        super('walkLeft', game);
    }
    enter() {
        this.game.taurus.frameX = 0;
        this.game.taurus.maxFrameX = 15;
      
    }
    input() {
        
    }
}