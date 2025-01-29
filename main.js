import { Input } from './input.js';
import { Player } from './player.js';
import { Background } from './background.js';
import { Taurus } from './taurus.js';
import { Menu, Running, Paused, GameOver, Shop } from './gameStates.js'
import { states } from './gameStates.js';
import { UI } from './UI.js';

export const easy = document.getElementById('easy');
export const medium = document.getElementById('medium');
export const hard = document.getElementById('hard');
export const restartButton = document.getElementById('restartButton');

export const waves = {
    wave1: [3, 15000],
    wave2: [5, 10000],
    wave3: [10, 9000],
    wave4: [13, 6000],
    wave5: [18, 4000],
}


// window.addEventListener('load', function(){
    export const canvas = document.getElementById('canvas1');
    export const ctx = canvas.getContext('2d');
    canvas.height = 800;
    canvas.width = canvas.height * 1.875;
    

    class Game {
        constructor(width, height) {
            this.canvas = canvas;
            this.width = width;
            this.height = height;
            this.states = [new Menu(this), new Running(this), new Paused(this), new GameOver(this), new Shop(this)];
            this.currentState = null;
            this.player = new Player(this); 
            this.input = new Input(this);
            this.background = new Background(this);
            this.UI = new UI(this);
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            this.wave = 5;
            this.gameOver = false;
            this.playerAlive = true;
            this.enemies = [];
            this.enemyInterval = waves[`wave${this.wave}`][1];
            this.enemyTimer = this.enemyInterval + 1;
            this.gameRunning = false;
            this.animationFrameId = null;
            this.animationShop = null;
            this.numberOfEnemies = 0;
            this.difficulty = 3;
            this.enemiesDead = 0;
            this.waveBarWidth = 400;
            this.wavebarHeight = 20;
            this.waveBarRevealWidth;
        }
        update(deltaTime) {
            console.log(this.UI.speedCounter)
            this.waveBarRevealWidth = this.waveBarWidth - (this.waveBarWidth / (waves[`wave${this.wave}`][0] / (waves[`wave${this.wave}`][0] - this.enemiesDead)))
        
            this.player.update(this.input.keys, deltaTime, this.input.clicks);
            if (this.numberOfEnemies < waves[`wave${this.wave}`][0]) {
                if (this.enemyTimer > this.enemyInterval) {
                    this.addEnemy();
                    this.enemyTimer = 0;
                    this.numberOfEnemies ++;
                }
                else {
                    this.enemyTimer += deltaTime;
                }
            }
            else {
                if (this.enemies.length === 0) {
                    this.wave ++;
                    this.numberOfEnemies = 0;
                    this.enemyTimer = 10000;
                    this.enemiesDead = 0
                    this.enemyInterval = waves[`wave${this.wave}`][1];
                }
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

            for (let i = 6; i <= 30; i++) {  
                const previousWave = waves[`wave${i - 1}`];
                const newEnemyCount = previousWave[0] * 2;
                const newSpawnTime = Math.max(500, previousWave[1] - 500); 
            
                waves[`wave${i}`] = [newEnemyCount, newSpawnTime];
            }
        }
        draw(ctx, state) {
            this.background.draw(ctx);

            if (!this.gameOver) {
                this.enemies.forEach(enemy => {
                    enemy.draw(ctx, enemy.currentState);
                }); 
            }

            this.player.draw(ctx, state);
            this.UI.draw(ctx);
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
    easy.addEventListener('click', () => {
        if (game.gameRunning) {
            game.setState(2);
        } else {
            game.difficulty = 4;
            game.setState(1);
        }
    });

    medium.addEventListener('click', () => {
        if (game.gameRunning) {
            game.setState(2);
           
        } else {
            game.difficulty = 3;
            game.setState(1);
        }
    });

    hard.addEventListener('click', () => {
        if (game.gameRunning) {
            game.setState(2);
        } else {
            game.difficulty = 2;
            game.setState(1);
        }
    });

    restartButton.addEventListener('click', () => {
        location.reload();
    });

    export function shopAnimation() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.background.draw(ctx);
        game.UI.draw(ctx);
        game.UI.shop(ctx);
        game.animationShop = requestAnimationFrame(shopAnimation);
    }   

// });

//