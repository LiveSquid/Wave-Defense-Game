import {IdleRight, IdleLeft, RunningRight, RunningLeft, JumpingRight, JumpingLeft, DeathRight, DeathLeft, AttackRight, AttackLeft} from "./playerStates.js";
import {states} from './playerStates.js';

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 900;
        this.height = 350;
        this.playerWidthOffset = 382;
        this.playerHeightOffset = 130;
        this.playerHeightOffsetB = 40;
        this.x = 0;
        this.y = 0;
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
        this.speed = 2.5;
        this.animationCount = 0;
        this.rotate;
        this.angle = 0;
        this.isAttacking = false;
        this.originalAngle = 0;
        this.setAngle = false;
        this.widthHitbox = 68;
        this.heightHitbox = 180;
        this.health = 125;
        this.healthBarHeight = 12;
        this.healthBarWidth = 125;
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

        if ((this.x + this.playerWidthOffset) < 0) this.x = -this.playerWidthOffset;
        if (this.x > this.game.width - this.width + this.playerWidthOffset) this.x = this.game.width - this.width + this.playerWidthOffset;
        if ((this.y + this.playerHeightOffset) < 0) this.y = -this.playerHeightOffset;
        if ((this.y + this.height - this.playerHeightOffsetB) > this.game.height) this.y = this.game.height - this.height + this.playerHeightOffsetB;

        if (this.health <= 0) {
            this.game.gameOver = true;
        }
    }
    attack() {
        if (!this.isAttacking) {
            this.isAttacking = true;

            this.rotate = this.rotation(this.game.input.mouse, this);
            this.angle = Math.atan2(this.rotate[3], this.rotate[2]);    
    
            this.originalAngle = this.angle;
    
            if (this.angle < 1.55 && this.angle > -1.55) {
                this.setState(states.attackRight); 
            }
            else {
                this.setState(states.attackLeft); 
            }
    
            setTimeout(() => {
                this.isAttacking = false;
                this.angle = this.originalAngle; 
                if (this.currentState.state.includes('Right')) {
                    this.setState(0); 
                }
                else if (this.currentState.state.includes('Left')) {
                    this.setState(1); 
                }
            }, 490); 
        }
    }
    draw(ctx, state) {
        const stateName = state.state;
        const image = this[stateName];
        if (this.health < 100) {
            ctx.fillStyle = '#fc1c03';
            ctx.fillRect(this.x + this.width/2 - this.healthBarWidth/2 - 7, this.y + this.playerHeightOffset - 20, this.healthBarWidth, this.healthBarHeight);

            ctx.fillStyle = '#52fc03';
            ctx.fillRect(this.x + this.width/2 - this.healthBarWidth/2 - 7, this.y + this.playerHeightOffset - 20, this.healthBarWidth - (100 - this.health), this.healthBarHeight);
            ctx.strokeRect(this.x + this.width/2 - this.healthBarWidth/2 - 7, this.y + this.playerHeightOffset - 20, this.healthBarWidth, this.healthBarHeight);
        }

        if (!this.isAttacking) {
            ctx.drawImage(image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        }   
        else {
            ctx.save();
            ctx.translate(this.x + (this.width/2), this.y + (this.height/2));
            if (this.currentState.state.includes('Right')) {
                ctx.rotate(this.angle);
                ctx.drawImage(image, this.frameX * this.width, 0, this.width, this.height, -this.width/2, -this.height/2, this.width, this.height);
                ctx.restore();
            }
            else {
                ctx.rotate(this.angle + Math.PI);
                ctx.drawImage(image, this.frameX * this.width, 0, this.width, this.height, -this.width/2, -this.height/2, this.width, this.height);
                ctx.restore();
            }
        }
        // ctx.strokeRect(this.x + (this.width/2) - (this.widthHitbox/2) - 10, this.y + (this.height/2) - (this.heightHitbox/2) + 38, this.widthHitbox, this.heightHitbox);
    }
    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    rotation(a, b) {
        if (!this.setAngle) {
            const dx = a.x - (b.x + (this.width/2));
            const dy = a.y - (b.y + (this.height/2));
            const distance = Math.hypot(dx, dy);
            const rotateX = dx / distance;
            const rotateY = dy / distance;
            return [rotateX, rotateY, dx, dy];
        }
    }
}