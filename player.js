import {IdleRight, IdleLeft, RunningRight, RunningLeft, Jumping} from "./playerStates.js";

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 900;
        this.height = 350;
        this.playerWidthOffset = 382;
        this.playerHeightOffset = 130;
        this.playerHeightOffsetB = 40;
        this.x = 450;
        this.y = 100;
        this.idleRight = idleRight;
        this.idleLeft = idleLeft;
        this.runningRight = runningRight;
        this.runningLeft = runningLeft
        this.frameX = 0;
        this.maxFrameX = 11;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000/ this.fps;
        this.states = [new IdleRight(this.game), new IdleLeft(this.game), new RunningRight(this.game), new RunningLeft(this.game), new Jumping(this.game)];
        this.currentState = null;
        this.speed = 1;
    }
    update(input, deltaTime) {
        this.currentState.input(input);

        if (input.includes('s')) this.y += this.speed;
        if (input.includes('w')) this.y -= this.speed;
        if (input.includes('d')) this.x += this.speed;
        if (input.includes('a')) this.x -= this.speed;

        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrameX) this.frameX ++
            else this.frameX = 0
            this.frameTimer = 0;    
        }
        else {
            this.frameTimer += (deltaTime);
        }

        if ((this.x + this.playerWidthOffset) < 0) this.x = -this.playerWidthOffset;
        if (this.x > this.game.width - this.width + this.playerWidthOffset) this.x = this.game.width - this.width + this.playerWidthOffset;
        if ((this.y + this.playerHeightOffset) < 0) this.y = -this.playerHeightOffset;
        if ((this.y + this.height - this.playerHeightOffsetB) > this.game.height) this.y = this.game.height - this.height + this.playerHeightOffsetB;
    }
    draw(ctx, state) {
        const stateName = state.state;
        const image = this[stateName];
        ctx.drawImage(image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}