import {IdleRight, IdleLeft, RunningRight, RunningLeft, JumpingRight, JumpingLeft, DeathRight, DeathLeft, AttackRight, AttackLeft} from "./playerStates.js";

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 900;
        this.height = 350;
        this.playerWidthOffset = 382;
        this.playerHeightOffset = 130;
        this.playerHeightOffsetB = 40;
        this.x = -200;
        this.y = 100;
        this.idleRight = idleRight;
        this.idleLeft = idleLeft;
        this.runningRight = runningRight;
        this.runningLeft = runningLeft
        this.jumpingRight = jumpingRight;
        this.jumpingLeft = jumpingLeft;
        this.deathRight = deathRight;
        this.deathLeft = deathLeft;
        this.attackRight = attackRight;
        this.attackLeft = attackLeft;
        this.frameX = 0;
        this.maxFrameX = 11;
        this.maxFrameL = 11;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000/ this.fps;
        this.states = [new IdleRight(this.game), new IdleLeft(this.game), new RunningRight(this.game), new RunningLeft(this.game), new JumpingRight(this.game), new JumpingLeft(this.game), new DeathRight(this.game), new DeathLeft(this.game), new AttackRight(this.game), new AttackLeft(this.game)];
        this.currentState = null;
        this.speed = 1.5;
        this.animationCount = 0;
        this.rotate;
    }
    update(inputK, deltaTime, inputM) {
        this.currentState.input(inputK, inputM);
        this.frameInterval = 1000/ this.fps;

        if (inputK.includes('s')) this.y += this.speed;
        if (inputK.includes('w')) this.y -= this.speed;
        if (inputK.includes('d')) this.x += this.speed;
        if (inputK.includes('a')) this.x -= this.speed;

        if (this.currentState.state.includes('Left')) { 
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX > this.maxFrameX) this.frameX --;
                else {
                    this.frameX = this.maxFrameL;
                    this.animationCount += 1;
                }
                this.frameTimer = 0;    
            }
            else {
                this.frameTimer += (deltaTime);
            }
        }

        if (this.currentState.state.includes('Right')) {
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX < this.maxFrameX) this.frameX ++;
                else {
                    this.frameX = 0;
                    this.animationCount += 1;
                }
                this.frameTimer = 0;    
            }
            else {
                this.frameTimer += (deltaTime);
            }
        }

        this.rotate = this.game.
        // const dx = this.game.input.mouseX - (this.x + (this.width / 2));
        // const dy = this.game.input.mouseY - (this.y + (this.height / 2));
        // this.rotation = Math.atan2(dy, dx);


        if ((this.x + this.playerWidthOffset) < 0) this.x = -this.playerWidthOffset;
        if (this.x > this.game.width - this.width + this.playerWidthOffset) this.x = this.game.width - this.width + this.playerWidthOffset;
        if ((this.y + this.playerHeightOffset) < 0) this.y = -this.playerHeightOffset;
        if ((this.y + this.height - this.playerHeightOffsetB) > this.game.height) this.y = this.game.height - this.height + this.playerHeightOffsetB;
    }
    draw(ctx, state) {
        const stateName = state.state;
        const image = this[stateName];

        // ctx.save();
        // ctx.translate(this.x + (this.width * 0.5), this.y - (this.height * 0.5) + 80);
        // ctx.rotate(this.rotation);
        ctx.drawImage(image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        // ctx.restore();
    }
    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}