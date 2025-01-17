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

export class WalkLeft extends State {
    constructor(game) {
        super('walkLeft', game);
    }
    enter() {
        this.game.taurus.frameX = 0;
        this.game.taurus.maxFrameX = 15;
    }
    input(direction) {
        if (direction[2] < 0 ) this.game.taurus.setState(states.walkRight);
    }
}

export class WalkRight extends State {
    constructor(game) {
        super('walkRight', game);
    }
    enter() {
        this.game.taurus.frameX = 15;
        this.game.taurus.maxFrameX = 0;
        this.game.taurus.maxFrameR = 15;
    }
    input(direction) {
        if (direction[2] > 0 ) this.game.taurus.setState(states.walkLeft);
    }
}