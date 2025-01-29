import {easy, medium, hard, animate, canvas, restartButton, ctx, shopAnimation} from './main.js';
import { UI } from './UI.js';

export const states = {
    menu: 0,
    running: 1,
    paused: 2,
    gameOver: 3,
    shop: 4,
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

        easy.style.display = 'block';
        easy.style.zIndex = '50';
        easy.style.position = 'absolute';
        easy.style.left = '25%';
        easy.style.top = '50%';
        easy.style.transform = 'translate(-50%, -50%)';
        easy.style.fontSize = '4vw';
        easy.style.color = 'yellow';
        easy.style.fontFamily = 'Times New Roman';
        easy.style.backgroundColor = 'transparent';
        easy.style.borderRadius = '1.5vw'
        easy.style.padding = '0.8vw'
        easy.style.borderColor = 'white'

        medium.style.display = 'block';
        medium.style.zIndex = '50';
        medium.style.position = 'absolute';
        medium.style.left = '50%';
        medium.style.top = '50%';
        medium.style.transform = 'translate(-50%, -50%)';
        medium.style.fontSize = '4vw';
        medium.style.color = '#24f05a';
        medium.style.fontFamily = 'Times New Roman';
        medium.style.backgroundColor = 'transparent';
        medium.style.borderRadius = '1.5vw'
        medium.style.padding = '0.8vw'
        medium.style.borderColor = 'white'

        hard.style.display = 'block';
        hard.style.zIndex = '50';
        hard.style.position = 'absolute';
        hard.style.left = '75%';
        hard.style.top = '50%';
        hard.style.transform = 'translate(-50%, -50%)';
        hard.style.fontSize = '4vw';
        hard.style.color = 'red';
        hard.style.fontFamily = 'Times New Roman';
        hard.style.backgroundColor = 'transparent';
        hard.style.borderRadius = '1.5vw'
        hard.style.padding = '0.8vw'
        hard.style.borderColor = 'white'
    
        easy.addEventListener('mouseenter', () => {
            easy.style.transform = 'translate(-50%, -50%) scale(1.1)';
            easy.style.transition = '0.3s';
        });
        easy.addEventListener('mouseleave', () => {
            easy.style.transform = 'translate(-50%, -50%) scale(1)';  
        });

        medium.addEventListener('mouseenter', () => {
            medium.style.transform = 'translate(-50%, -50%) scale(1.1)';
            medium.style.transition = '0.3s';
        });
        medium.addEventListener('mouseleave', () => {
            medium.style.transform = 'translate(-50%, -50%) scale(1)';  
        });

        hard.addEventListener('mouseenter', () => {
            hard.style.transform = 'translate(-50%, -50%) scale(1.1)';
            hard.style.transition = '0.3s';
        });
        hard.addEventListener('mouseleave', () => {
            hard.style.transform = 'translate(-50%, -50%) scale(1)';  
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

        cancelAnimationFrame(this.game.animationShop);
        this.game.gameRunning = true;
        animate(0);

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
        easy.style.display = 'none'
        medium.style.display = 'none'
        hard.style.display = 'none'
    }
}

export class Paused extends State {
    constructor(game) {
        super('paused', game);
    }
    enter() {
        this.game.gameRunning = false;
        this.game.UI.drawButton(ctx, this.game.width - this.game.UI.buttonWidth - this.game.UI.offset, 0 + this.game.UI.offset, this.game.UI.buttonWidth, this.game.UI.buttonHeight, 'Play', 'white', 'black');
        cancelAnimationFrame(this.game.animationFrameId);
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
            easy.style.display = 'none'
            
            restartButton.style.display = 'block';
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

export class Shop extends State {
    constructor(game) {
        super('shop', game);
    }
    enter() {
        this.game.gameRunning = false;
        this.game.UI.shop(ctx);
        cancelAnimationFrame(this.game.animationFrameId);
    
        shopAnimation()
    }
    
}  