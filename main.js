import { Input } from './input.js';
import { Player } from './player.js';

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1500;
    canvas.height = 800;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.player = new Player(this); 
            this.input = new Input(this);
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }
        update(deltaTime) {
            this.player.update(this.input.keys, deltaTime);
        }
        draw(ctx, state) {
            ctx.drawImage(grass, 0, 0, 1500, 800);
            this.player.draw(ctx, state);
        }
    }

    const game = new Game(canvas.width, canvas.height);

    let lastTime = 0
    function animate(timeStamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime);
        game.draw(ctx, game.player.currentState);
        requestAnimationFrame(animate);
    }
    animate(0);
});