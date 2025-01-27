export const states = {
    walkLeft: 0,
    walkRight: 1,
    attackLeftT1: 2,
    attackRightT1: 3,
    deathLeftT1: 4,
}

class State  {
    constructor(state, taurus) {
        this.state = state;
        this.taurus = taurus;
    }
}

export class WalkLeft extends State {
    constructor(taurus) {
        super('walkLeft', taurus);
    }
    enter() {
        this.taurus.frameX = 0;
        this.taurus.maxFrameX = 15;
        this.taurus.animationCount = 0;
    }
    input(direction) {
        if (direction[2] < 20 ) this.taurus.setState(states.walkRight);
    }
}

export class WalkRight extends State {
    constructor(taurus) {
        super('walkRight', taurus);
    }
    enter() {
        this.taurus.frameX = 15;
        this.taurus.maxFrameX = 0;
        this.taurus.maxFrameR = 15;
        this.taurus.animationCount = 0;
    }
    input(direction) {
        if (direction[2] > 20 ) this.taurus.setState(states.walkLeft);
    }
}

export class AttackLeft extends State {
    constructor(taurus) {
        super('attackLeftT1', taurus);
    }
    enter() {
        this.taurus.fps = 10
        this.taurus.frameX = 0;
        this.taurus.maxFrameX = 12;
        this.taurus.animationCount = 0;
    }
    input(direction) {
        if (this.taurus.animationCount >= 1) this.taurus.setState(states.walkLeft);
    }
    
}

export class AttackRight extends State {
    constructor(taurus) {
        super('attackRightT1', taurus);
    }
    enter() {
        this.taurus.frameX = 12;
        this.taurus.maxFrameX = 0;
        this.taurus.maxFrameR = 12;
        this.taurus.animationCount = 0;
    }
    input(direction) {
        if (this.taurus.animationCount >= 1) this.taurus.setState(states.walkRight);
    }
}

export class DeathLeft extends State {
    constructor(taurus) {
        super('deathLeftT1', taurus);
    }
    enter() {
        this.taurus.speedMultiplier = 0;
        this.speedX = 0;
        this.taurus.fps = 10
        this.taurus.frameX = 0;
        this.taurus.maxFrameX = 17;
        this.taurus.animationCount = 0;
    }
    input(direction) {
        if (this.taurus.animationCount >= 1) {
            this.taurus.taurusAlive = false;
            this.taurus.alive = true;
        }
    }
}