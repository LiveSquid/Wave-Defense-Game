import { Input } from './input.js';
import { Player } from './player.js';
import { Background } from './background.js';
import { Taurus } from './taurus.js';
import { Menu, Running, Paused, GameOver } from './gameStates.js'
import { states } from './gameStates.js';

export const startButton = document.getElementById('startButton');
export const restartButton = document.getElementById('restartButton');

// window.addEventListener('load', function(){
    export const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1500;
    canvas.height = 800;

    class Game {
        constructor(width, height) {
            this.canvas = canvas;
            this.width = width;
            this.height = height;
            this.states = [new Menu(this), new Running(this), new Paused(this), new GameOver(this)];
            this.currentState = null;
            this.player = new Player(this); 
            this.input = new Input(this);
            this.background = new Background(this);
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            this.gameOver = false;
            this.playerAlive = true;
            this.enemies = [];
            this.enemyTimer = 15100;
            this.enemyInterval = 15000;
            this.gameRunning = false;
            this.animationFrameId = null;
            this.wave = 1;
        }
        update(deltaTime) {
            this.player.update(this.input.keys, deltaTime, this.input.clicks);

            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            }
            else {
                this.enemyTimer += deltaTime;
            }

            if (this.playerAlive) {
                this.enemies.forEach(enemy => {
                    enemy.update(deltaTime);
                    if (enemy.health <= 0) {
                        enemy.death();
                    }
                });
            }
            this.enemies = this.enemies.filter(enemy => enemy.taurusAlive);
        }
        draw(ctx, state) {
            this.background.draw(ctx);

            if (!this.gameOver) {
                this.enemies.forEach(enemy => {
                    enemy.draw(ctx, enemy.currentState);
                }); 
            }

            this.player.draw(ctx, state);
        }
        addEnemy() {
            let x, y;

            const spawnSide = Math.floor(Math.random() * 4);

            switch (spawnSide) {
                case 0:
                    x = -100;
                    y = Math.random() * this.height;
                case 1:
                    x = this.canvas.width + 100;
                    y = Math.random() * this.height;
                case 2:
                    x = Math.random() * this.width;
                    y = this.height + 100;
                case 3:
                    x = Math.random() * this.width;
                    y = this.height - 100;
            }

            this.taurus = new Taurus(this);
            this.taurus.x = x;
            this.taurus.y = y;
            this.taurus.currentState = this.taurus.states[0];
            this.taurus.currentState.enter();
            this.enemies.push(this.taurus);
        }
        rotation(a, b, w, h) {
            const dx = (a.x + w.width/2) - (b.x + (this.player.width/2));                
            const dy = (a.y + h.height/2) - (b.y + (this.player.height/2));
            const distance = Math.hypot(dx, dy);
            const rotateX = dx / distance;
            const rotateY = dy / distance;
            return [rotateX, rotateY, dx, dy, distance];
        }
        setState(state) {
            this.currentState = this.states[state];
            this.currentState.enter();
        }
    }

    const game = new Game(canvas.width, canvas.height);
    game.setState(0);

    let lastTime = 0
    export function animate(timeStamp) {
        if (!game.gameRunning) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime);
        game.draw(ctx, game.player.currentState);
        game.animationFrameId = requestAnimationFrame(animate);
        
        if (game.gameOver) game.setState(3);
    }
    startButton.addEventListener('click', () => {
        if (game.gameRunning) {
            game.setState(2);
        } else {
            game.setState(1)
        }
    });

    restartButton.addEventListener('click', () => {
        location.reload();
    });

// });

//