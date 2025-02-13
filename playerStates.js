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
    comboRight: 10,
    comboLeft: 11,
    drawRight: 12,
    drawLeft: 13,
    fullComboRight: 14,
    fullComboLeft: 15,
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
        this.game.player.width = 900;
        this.game.player.height = 350;
        this.game.playerAlive = true;
        this.game.player.frameX = 0;
        this.game.player.speed = this.game.player.maxSpeed;
        this.game.player.maxFrameX = 11;
        this.game.player.setAngle = false;
    }
    input(inputK, inputM) {
        if (inputK.includes('d')) this.game.player.setState(states.runningRight);
        else if (inputK.includes('a')) this.game.player.setState(states.runningLeft);
        else if (inputK.includes('w')) this.game.player.setState(states.runningRight);
        else if (inputK.includes('s')) this.game.player.setState(states.runningRight);
        // else if (inputK.includes('Shift')) this.game.player.setState(states.deathRight);
        // else if (inputK.includes('Shift')) this.game.player.setState(states.fullComboRight);
    }
}

export class IdleLeft extends State {
    constructor(game) {
        super('idleLeft', game);
    }
    enter() {
        this.game.player.width = 900;
        this.game.player.height = 350;
        this.game.playerAlive = true;
        this.game.player.speed = this.game.player.maxSpeed;
        this.game.player.frameX = 11;
        this.game.player.maxFrameX = 0;
        this.game.player.maxFrameL = 11;
        this.game.player.setAngle = false;
    }
    input(inputK, inputM) {
        if (inputK.includes('a')) this.game.player.setState(states.runningLeft);
        if (inputK.includes('d')) this.game.player.setState(states.runningRight);
        else if (inputK.includes('s')) this.game.player.setState(states.runningLeft);
        else if (inputK.includes('w')) this.game.player.setState(states.runningLeft);
        // else if (inputK.includes('Shift')) this.game.player.setState(states.deathLeft);
        // else if (inputK.includes('Shift')) this.game.player.setState(states.fullComboLeft);
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
        this.game.playerAlive = false;
        this.game.player.fps = 7;
        this.game.player.frameX = 0;
        this.game.player.maxFrameX = 13;
        
    }
    input(inputK) {
        if (this.game.player.frameX === 13) this.game.gameOver = true;
    }
}

export class DeathLeft extends State {
    constructor(game) {
        super('deathLeft', game);
    }
    enter() {
        this.game.playerAlive = false;
        this.game.player.fps = 7;
        this.game.player.frameX = 17;
        this.game.player.maxFrameX = 4;
        this.game.player.maxFrameL = 17;
    }
    input(inputK) {
        if (this.game.player.frameX === 4) this.game.gameOver = true;
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

export class ComboRight extends State {
    constructor(game) {
        super('comboRight', game);
    }
    enter() {
        this.game.player.fps = 20;
        this.game.player.frameX = 0;
        this.game.player.maxFrameX = 12;
        this.game.player.animationCount = 0;
        this.game.player.speed = 0;
        this.game.player.setAngle = true;
    }
    input(inputK) {
        if (this.game.player.animationCount >= 1) {
            this.game.player.x += 40;
            this.game.player.setState(states.idleRight);
        }
    }
}

export class ComboLeft extends State {
    constructor(game) {
        super('comboLeft', game);
    }
    enter() {
        this.game.player.fps = 20;
        this.game.player.frameX =12;
        this.game.player.maxFrameX = 0;
        this.game.player.maxFrameL = 12;
        this.game.player.animationCount = 0;
        this.game.player.speed = 0;
        this.game.player.setAngle = true;
    }
    input(inputK) {
        if (this.game.player.animationCount >= 1) {
            this.game.player.x -= 40;
            this.game.player.setState(states.idleLeft);
        }
    }
}

export class DrawRight extends State {
    constructor(game) {
        super('drawRight', game);
    }
    enter() {
        this.game.player.fps = 20;
        this.game.player.frameX = 0;
        this.game.player.maxFrameX = 5;
        this.game.player.animationCount = 0;
        this.game.player.speed = 0;
        this.game.player.setAngle = true;
    }
    input(inputK) {
        if (this.game.player.animationCount >= 1) this.game.player.setState(states.idleRight);
    }
}

export class DrawLeft extends State {
    constructor(game) {
        super('drawLeft', game);
    }
    enter() {
        this.game.player.fps = 20;
        this.game.player.frameX =5;
        this.game.player.maxFrameX = 0;
        this.game.player.maxFrameL = 5;
        this.game.player.animationCount = 0;
        this.game.player.speed = 0;
        this.game.player.setAngle = true;
    }
    input(inputK) {
        if (this.game.player.animationCount >= 1) this.game.player.setState(states.idleLeft);
    }
}

export class FullComboRight extends State {
    constructor(game) {
        super('fullComboRight', game);
    }
    enter() {
        this.game.player.width = 450;
        this.game.player.height = 175;
        this.game.player.fps = 20;
        this.game.player.frameX = 0;
        this.game.player.maxFrameX = 25;
        this.game.player.animationCount = 0;
        this.game.player.speed = 0;
        this.game.player.setAngle = true;
    }
    input(inputK) {
        if (this.game.player.animationCount >= 1) {
            // this.game.player.x += 40;
            this.game.player.setState(states.idleRight);
        }
    }
}

export class FullComboLeft extends State {
    constructor(game) {
        super('fullComboLeft', game);
    }
    enter() {
        this.game.player.width = 450;
        this.game.player.height = 175;
        this.game.player.fps = 20;
        this.game.player.frameX =25;
        this.game.player.maxFrameX = 0;
        this.game.player.maxFrameL = 25;
        this.game.player.animationCount = 0;
        this.game.player.speed = 0;
        this.game.player.setAngle = true;
    }
    input(inputK) {
        if (this.game.player.animationCount >= 1) {
            // this.game.player.x -= 40;
            this.game.player.setState(states.idleLeft);
        }
    }
}
