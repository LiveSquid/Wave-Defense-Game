export const states = {
    walkLeft: 0,
    walkRight: 1,
    attackLeftT1: 2,
    attackRightT1: 3,
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

export class AttackLeft extends State {
    constructor(game) {
        super('attackLeftT1', game);
    }
    enter() {
        this.game.taurus.fps = 10
        this.game.taurus.frameX = 0;
        this.game.taurus.maxFrameX = 12;
        this.game.taurus.animationCount = 0;
        
    }
    input(direction) {
        if (this.game.taurus.animationCount >= 1) this.game.taurus.setState(states.walkLeft);
    }
    
}

export class AttackRight extends State {
    constructor(game) {
        super('attackRightT1', game);
    }
    enter() {
        this.game.taurus.frameX = 12;
        this.game.taurus.maxFrameX = 0;
        this.game.taurus.maxFrameR = 12;
        this.game.taurus.animationCount = 0;
    }
    input(direction) {
         if (this.game.taurus.animationCount >= 1) this.game.taurus.setState(states.walkRight);
    }
}