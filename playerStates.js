export const states = {
    idleRight: 0,
    idleLeft: 1,
    runningRight: 2,
    runningLeft: 3,
    jumpingRight: 4,
    jumpingLeft: 5,
    deathRight: 6,
    deathLeft: 7,
    attackRight: 8,
    attackLeft: 9,
}


class State  {
    constructor(state, game) {
        this.state = state;
        this.game = game;
    }
}

export class IdleRight extends State {
    constructor(game) {
        super('idleRight', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrameX = 11;
        this.game.player.speed = 1.5;
        this.game.player.setAngle = false;
    }
    input(inputK, inputM) {
        if (inputK.includes('d')) this.game.player.setState(states.runningRight);
        else if (inputK.includes('a')) this.game.player.setState(states.runningLeft);
        else if (inputK.includes('w')) this.game.player.setState(states.runningRight);
        else if (inputK.includes('s')) this.game.player.setState(states.runningRight);
        else if (inputK.includes('Shift')) this.game.player.setState(states.deathRight);
    }
}

export class IdleLeft extends State {
    constructor(game) {
        super('idleLeft', game);
    }
    enter() {
        this.game.player.frameX = 11;
        this.game.player.maxFrameX = 0;
        this.game.player.maxFrameL = 11;
        this.game.player.speed = 1.5;
        this.game.player.setAngle = false;
    }
    input(inputK, inputM) {
        if (inputK.includes('a')) this.game.player.setState(states.runningLeft);
        if (inputK.includes('d')) this.game.player.setState(states.runningRight);
        else if (inputK.includes('s')) this.game.player.setState(states.runningLeft);
        else if (inputK.includes('w')) this.game.player.setState(states.runningLeft);
        else if (inputK.includes('Shift')) this.game.player.setState(states.deathLeft);
    }
}

export class RunningRight extends State {
    constructor(game) {
        super('runningRight', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrameX = 11;
    }
    input(inputK, inputM) {
        if (!inputK.includes('d') && !inputK.includes('w') && !inputK.includes('s')) this.game.player.setState(states.idleRight);
        if (inputK.includes('a')) this.game.player.setState(states.runningLeft);
        else if (inputK.includes(' ')) this.game.player.setState(states.jumpingRight);
    }
}

export class RunningLeft extends State {
    constructor(game) {
        super('runningLeft', game);
    }
    enter() {
        this.game.player.frameX = 11;
        this.game.player.maxFrameX = 0;
        this.game.player.maxFrameL = 11;
    }
    input(inputK, inputM) {
        if (!inputK.includes('a') && !inputK.includes('w') && !inputK.includes('s')) this.game.player.setState(states.idleLeft);
        if (inputK.includes('d')) this.game.player.setState(states.runningRight);
        else if (inputK.includes(' ')) this.game.player.setState(states.jumpingLeft);
    }
}

export class JumpingRight extends State {
    constructor(game) {
        super('jumpingRight', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrameX = 11;
    }
    input(inputK, inputM) {
        if (this.game.player.frameX === 11) this.game.player.setState(states.idleRight);
    }
}

export class JumpingLeft extends State {
    constructor(game) {
        super('jumpingLeft', game);
    }
    enter() {
        this.game.player.frameX = 11;
        this.game.player.maxFrameX = 0;
        this.game.player.maxFrameL = 11;
    }
    input(inputK, inputM) {
        if (this.game.player.frameX === 0) this.game.player.setState(states.idleLeft);
    }
}

export class DeathRight extends State {
    constructor(game) {
        super('deathRight', game);
    }
    enter() {
        this.game.player.fps = 7;
        this.game.player.frameX = 0;
        this.game.player.maxFrameX = 17;
        
    }
    input(inputK) {
        if (this.game.player.frameX === 17) this.game.gameOver = true;
    }
}

export class DeathLeft extends State {
    constructor(game) {
        super('deathLeft', game);
    }
    enter() {
        this.game.player.fps = 7;
        this.game.player.frameX = 17;
        this.game.player.maxFrameX = 0;
        this.game.player.maxFrameL = 17;
    }
    input(inputK) {
        if (this.game.player.frameX === 0) this.game.gameOver = true;
    }
}

export class AttackRight extends State {
    constructor(game) {
        super('attackRight', game);
    }
    enter() {
        this.game.player.fps = 20;
        this.game.player.frameX = 0;
        this.game.player.maxFrameX = 7;
        this.game.player.animationCount = 0;
        this.game.player.speed = 0;
        this.game.player.setAngle = true;
    }
    input(inputK) {
        if (this.game.player.animationCount >= 1) this.game.player.setState(states.idleRight);
    }
}

export class AttackLeft extends State {
    constructor(game) {
        super('attackLeft', game);
    }
    enter() {
        this.game.player.fps = 20;
        this.game.player.frameX = 7;
        this.game.player.maxFrameX = 0;
        this.game.player.maxFrameL = 7;
        this.game.player.animationCount = 0;
        this.game.player.speed = 0;
        this.game.player.setAngle = true;
    }
    input(inputK) {
        if (this.game.player.animationCount >= 1) this.game.player.setState(states.idleLeft);
    }
}