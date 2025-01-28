import {startButton, animate, canvas, restartButton, ctx} from './main.js';

export const states = {
    menu: 0,
    running: 1,
    paused: 2,
    gameOver: 3,
}

const title = document.getElementById('title');
const subTitle = document.getElementById('subTitle');
const fadeOverlay = document.getElementById('fade-overlay');

class State  {
    constructor(state, game) {
        this.state = state;
        this.game = game;
    }
}

export class Menu extends State {
    constructor(game) {
        super('menu', game);
    }
    enter() {
        canvas.style.zIndex = '5';
        canvas.style.border = 'none';
        canvas.style.background = 'linear-gradient(to bottom, rgb(86, 74, 245), rgb(40, 55, 189), rgb(4, 4, 90))';
        canvas.style.width = '100%';
        canvas.style.height = '100%';

        title.style.display = 'block';
        title.style.zIndex = '8';
        title.style.position = 'absolute';
        title.style.left = '50%';
        title.style.top = '15%';
        title.style.transform = 'translate(-50%, -50%)';
        title.style.color = 'white';
        title.style.fontSize = '10vw'

        subTitle.style.display = 'block';
        subTitle.style.zIndex = '8';
        subTitle.style.position = 'absolute';
        subTitle.style.left = '50%';
        subTitle.style.top = '26.5%';
        subTitle.style.transform = 'translate(-50%, -50%)';
        subTitle.style.color = 'white';
        subTitle.style.fontSize = '1.3vw'

        startButton.style.display = 'block';
        startButton.style.zIndex = '50';
        startButton.style.position = 'absolute';
        startButton.style.left = '50%';
        startButton.style.top = '50%';
        startButton.style.transform = 'translate(-50%, -50%)';
        startButton.style.fontSize = '4vw';
        startButton.style.color = 'white';
        startButton.style.fontFamily = 'Times New Roman';
        startButton.style.backgroundColor = 'transparent';
        startButton.style.borderRadius = '1.5vw'
        startButton.style.padding = '0.8vw'
        startButton.style.borderColor = 'white'
    
        startButton.addEventListener('mouseenter', () => {
            startButton.style.transform = 'translate(-50%, -50%) scale(1.1)';
            startButton.style.transition = '0.3s';
        });
        startButton.addEventListener('mouseleave', () => {
            startButton.style.transform = 'translate(-50%, -50%) scale(1)';  
        });
    }
}

export class Running extends State {
    constructor(game) {
        super('running', game);
    }
    enter() {
        const gameContainer = document.documentElement; // Entire page
        if (gameContainer.requestFullscreen) {
            gameContainer.requestFullscreen();
        } 
        else if (gameContainer.mozRequestFullScreen) { // Firefox
            gameContainer.mozRequestFullScreen();
        } 
        else if (gameContainer.webkitRequestFullscreen) { // Chrome, Safari, Opera
            gameContainer.webkitRequestFullscreen();
        }

        canvas.style.width = '1500px'
        canvas.style.height = '800px'
        canvas.style.border = '5px solid black'
        canvas.style.position = 'absolute'
        canvas.style.top = '50%'
        canvas.style.left = '50%'
        canvas.style.transform = 'translate(-50%, -50%)'
        canvas.style.maxHeight = '100%'
        canvas.style.maxWidth ='100%'

        title.style.display = 'none'
        subTitle.style.display = 'none'

        startButton.style.transition = 'none';
        startButton.style.left = '5.2%'
        startButton.style.top = '7.5%'
        startButton.style.fontSize = '1.6vw';
        startButton.style.borderColor = 'black'
        startButton.style.color = 'black';
        startButton.style.padding = '0.6vw'
        startButton.style.borderRadius = '1.2vw'

        restartButton.style.display = 'block';
        restartButton.style.zIndex = '50';
        restartButton.style.position = 'absolute';
        restartButton.style.left = '5.2%';
        restartButton.style.top = '14.5%';
        restartButton.style.transform = 'translate(-50%, -50%)';
        restartButton.style.fontSize = '1.6vw';
        restartButton.style.color = 'black';
        restartButton.style.fontFamily = 'Times New Roman';
        restartButton.style.backgroundColor = 'transparent';
        restartButton.style.borderRadius = '1.2vw'
        restartButton.style.padding = '0.8vw'
        restartButton.style.borderColor = 'black'

    restartButton.addEventListener('mouseenter', () => {
        restartButton.style.transform = 'translate(-50%, -50%) scale(1.1)';
        restartButton.style.transition = '0.3s';
    });
    restartButton.addEventListener('mouseleave', () => {
        restartButton.style.transform = 'translate(-50%, -50%) scale(1)';  
    });

        this.game.gameRunning = true;
        startButton.textContent = 'Pause Game';
        animate(0);
    }
}

export class Paused extends State {
    constructor(game) {
        super('paused', game);
    }
    enter() {
        this.game.gameRunning = false;
        cancelAnimationFrame(this.game.animationFrameId);

        startButton.style.left = '5.25%'
        startButton.textContent = 'Resume Game';
    }
}

export class GameOver extends State {
    constructor(game) {
        super('gameOver', game);
    }
    enter() {
        this.game.gameRunning = false;
        cancelAnimationFrame(this.game.animationFrameId);

        fadeOverlay.style.zIndex = '49'
        fadeOverlay.style.transition = 'opacity 5s ease'
        fadeOverlay.style.opacity = 0.6;
        
        setTimeout(() => {
            startButton.style.display = 'none'
            
            restartButton.style.zIndex = '50'
            restartButton.style.position = 'absolute'
            restartButton.style.left = '50%'
            restartButton.style.top = '50%'
            restartButton.style.transform = 'translate(-50%, -50%)'
            restartButton.style.fontSize = '4vw'
            restartButton.style.color = 'white'
            restartButton.style.fontFamily = 'Times New Roman'
            restartButton.style.backgroundColor = 'transparent'
            restartButton.style.borderRadius = '1.5vw'
            restartButton.style.padding = '0.8vw'
            restartButton.style.borderColor = 'white'
        }, 3000); 
    }
}