import { WalkLeft, WalkRight, AttackLeft, AttackRight} from './taurusStates.js';

export class Taurus {
    constructor(game) {
        this.game = game
        this.width = 900;
        this.height = 500;
        this.x = 400;
        this.y = 150;
        this.speedX = 0;
        this.speedY = 0;
        this.frameX = 0;
        this.maxFrameX = 15;
        this.maxFrameR = 15;
        this.speedMultiplier = 0.3;
        this.fps = 20;
        this.frameInterval = 1000/ this.fps;
        this.frameTimer = 0; 
        this.delete = false;
        this.direction;
        this.walkLeft = walkLeft;
        this.walkRight = walkRight;
        this.attackLeftT1 = attackLeftT1;
        this.attackRightT1 = attackRightT1;
        this.states = [new WalkLeft(this.game), new WalkRight(this.game), new AttackLeft(this.game), new AttackRight(this.game)]
        this.currentState = null;
        this.widthHitbox = 510;
        this.heightHitbox = 450;
        this.isAttacking = false;
        this.angle = 0;
        this.animationCount = 0;
    }
    update(deltaTime) {
        this.frameInterval = 1000/ this.fps;

        if (this.currentState.state.includes('Right')) { 
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX > this.maxFrameX) this.frameX --;
                else {
                    this.frameX = this.maxFrameR;
                    this.animationCount += 1;
                }
                this.frameTimer = 0;    
            }
            else {
                this.frameTimer += (deltaTime);
            }
        }

        if (this.currentState.state.includes('Left')) {
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

        this.direction = this.game.rotation(this, this.game.player, this, this);
        this.angle = Math.atan2(this.direction[3], this.direction[2]);
        this.currentState.input(this.direction);

        console.log(this.direction[4]);
        if ((this.direction[4]) <= 1) {
            this.attack();
        }
        
        if (!this.isAttacking) {
            this.speedX = this.direction[0] * this.speedMultiplier;
            this.speedY = this.direction[1] * this.speedMultiplier;
            this.x -= this.speedX;
            this.y -= this.speedY;
        }
    }
    draw(ctx, state) {
        const stateName = state.state;
        const image = this[stateName];
        ctx.save()
        ctx.translate(this.x + (this.width/2), this.y + (this.height/2));
        if (this.currentState.state.includes('Right')) {
            ctx.rotate(this.angle + Math.PI);
            ctx.drawImage(image, this.frameX * this.width, 0, this.width, this.height, -this.width/2, -this.height/2, this.width, this.height);
            ctx.restore();
        }
        else {
            ctx.rotate(this.angle);
            ctx.drawImage(image, this.frameX * this.width, 0, this.width, this.height, -this.width/2, -this.height/2, this.width, this.height);
            ctx.restore();
        }
        // ctx.drawImage(image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        // ctx.restore();
        ctx.strokeRect(this.x + (this.width/2) - (this.widthHitbox/2), this.y + (this.height/2) - (this.heightHitbox/2), this.widthHitbox, this.heightHitbox);
    }
    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    attack() {
        if(!this.isAttacking) {
            this.isAttacking = true;
           
            if (this.currentState.state.includes('Right')) {
                this.setState(3); 
            }
            else if (this.currentState.state.includes('Left')) {
                this.setState(2); 
            }

            setTimeout(() => {
                this.isAttacking = false; 
            }, 2000); 
            
        }
    }
}