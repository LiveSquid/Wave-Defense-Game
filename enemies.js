import { WalkLeft, WalkRight} from './taurusStates.js';

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
        this.states = [new WalkLeft(this.game), new WalkRight(this.game)]
        this.currentState = null;
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
        this.currentState.input(this.direction);
        // console.log(this.direction);

        this.speedX = this.direction[0] * this.speedMultiplier;
        this.speedY = this.direction[1] * this.speedMultiplier;
        this.x -= this.speedX;
        this.y -= this.speedY;
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