export const states = {
    idleRight: 0,
    idleLeft: 1,
    runningRight: 2,
    runningLeft: 3,
    jumping: 4,
};

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
    }
    input(input) {
        if (input.includes('d')) this.game.player.setState(states.runningRight);
        else if (input.includes('a')) this.game.player.setState(states.runningLeft);
        else if (input.includes('w')) this.game.player.setState(states.runningRight);
        else if (input.includes('s')) this.game.player.setState(states.runningRight);
    }
}

export class IdleLeft extends State {
    constructor(game) {
        super('idleLeft', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrameX = 11;
    }
    input(input) {
        if (input.includes('a')) this.game.player.setState(states.runningLeft);
        else if (input.includes('d')) this.game.player.setState(states.runningRight);
        else if (input.includes('s')) this.game.player.setState(states.runningLeft);
        else if (input.includes('w')) this.game.player.setState(states.runningLeft);
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
    input(input) {
        if (!input.includes('d') && !input.includes('w') && !input.includes('s')) this.game.player.setState(states.idleRight);
        if (input.includes('a')) this.game.player.setState(states.runningLeft);
    }
}

export class RunningLeft extends State {
    constructor(game) {
        super('runningLeft', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrameX = 11;
    }
    input(input) {
        if (!input.includes('a') && !input.includes('w') && !input.includes('s')) this.game.player.setState(states.idleLeft);
        if (input.includes('d')) this.game.player.setState(states.runningRight);
    }
}

export class Jumping extends State {
    constructor(game) {
        super('jumping', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrameX = 11;
    }
    input(input) {
        if (input.includes('d')) this.game.player.setState(states.running);
    }
}