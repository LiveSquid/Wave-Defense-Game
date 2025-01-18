import { Input } from './input.js';
import { Player } from './player.js';
import { Background } from './background.js';
import { Taurus } from './taurus.js';

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1500;
    canvas.height = 800;

    class Game {
        constructor(width, height) {
            this.canvas = canvas;
            this.width = width;
            this.height = height;
            this.player = new Player(this); 
            this.input = new Input(this);
            this.background = new Background(this);
            this.taurus = new Taurus(this);
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            this.taurus.currentState = this.taurus.states[0];
            this.taurus.currentState.enter();
            this.gameOver = false;
        }
        update(deltaTime) {
            this.player.update(this.input.keys, deltaTime, this.input.clicks);
            this.taurus.update(deltaTime);
        }
        draw(ctx, state, stateT) {
            this.background.draw(ctx);
            this.taurus.draw(ctx, stateT);
            this.player.draw(ctx, state);
            
        }
        rotation(a, b, w, h) {
            const dx = (a.x + w.width/2) - (b.x + (this.player.width/2));                
            const dy = (a.y + h.height/2) - (b.y + (this.player.height/2));
            const distance = Math.hypot(dx, dy);
            const rotateX = dx / distance;
            const rotateY = dy / distance;
            return [rotateX, rotateY, dx, dy, distance];
        }
    }

    const game = new Game(canvas.width, canvas.height);

    let lastTime = 0
    function animate(timeStamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime);
        game.draw(ctx, game.player.currentState, game.taurus.currentState);
        if (!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
});

//