import {walkLeft} from './taurusStates.js';

class Enemy {
    constructor() {
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000/ this.fps;
        this.frameTimer = 0; 
        this.delete = false;
        this.direction
    }
    update(deltaTime) {
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrameX) this.frameX ++
            else this.frameX = 0
            this.frameTimer = 0;    
        }
        else {
            this.frameTimer += deltaTime;
        } 

        this.direction = this.game.rotation(this, this.game.player, this, this);
        console.log(this.direction);

        this.speedX = this.direction[0] * this.speedMultiplier;
        this.speedY = this.direction[1] * this.speedMultiplier;
        this.x -= this.speedX;
        this.y -= this.speedY;
    }
    draw(ctx) {
        // ctx.save();
        // ctx.translate(this.x + (this.width/2), this.y + (this.height/2));
        ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        // ctx.restore();
    }
}

export class Taurus extends Enemy {
    constructor(game) {
        super();
        this.game = game
        this.width = 900;
        this.height = 500;
        this.x = 500;
        this.y = 50;
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrameX = 15;
        this.image = walkLeftT;
        this.speedMultiplier = 1;
    }
    update(deltaTime) {
        super.update(deltaTime);

    }
}
