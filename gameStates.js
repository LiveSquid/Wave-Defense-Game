import {easy, medium, hard, howTo, animate, canvas, restartButton, ctx, shopAnimation} from './main.js';
import { UI } from './UI.js';

export const states = {
    menu: 0,
    running: 1,
    paused: 2,
    gameOver: 3,
    shop: 4,
    howTo: 5,
}

const title = document.getElementById('title');
const subTitle = document.getElementById('subTitle');
const fadeOverlay = document.getElementById('fade-overlay');
const controls = document.getElementById('controls');
const gameplay = document.getElementById('gameplay');
const tipsTricks = document.getElementById('tipsTricks');
const howToTitle = document.getElementById('howToTitle');
const controlsBody = document.getElementById('controlsBody');
const gameplayBody = document.getElementById('gameplayBody');
const tipsTricksBody = document.getElementById('tipsTricksBody');
const deathWave = document.getElementById('deathWave');

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
        title.style.fontSize = '6vw'
        title.style.whiteSpace = 'nowrap'

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
        easy.style.left = '35%';
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
        hard.style.left = '65%';
        hard.style.top = '50%';
        hard.style.transform = 'translate(-50%, -50%)';
        hard.style.fontSize = '4vw';
        hard.style.color = 'red';
        hard.style.fontFamily = 'Times New Roman';
        hard.style.backgroundColor = 'transparent';
        hard.style.borderRadius = '1.5vw'
        hard.style.padding = '0.8vw'
        hard.style.borderColor = 'white'

        howTo.style.display = 'block';
        howTo.style.zIndex = '50';
        howTo.style.position = 'absolute';
        howTo.style.left = '50%';
        howTo.style.top = '70%';
        howTo.style.transform = 'translate(-50%, -50%)';
        howTo.style.fontSize = '4vw';
        howTo.style.color = 'white';
        howTo.style.fontFamily = 'Times New Roman';
        howTo.style.backgroundColor = 'transparent';
        howTo.style.borderRadius = '1.5vw'
        howTo.style.padding = '0.8vw'
        howTo.style.borderColor = 'white'
    
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

        howTo.addEventListener('mouseenter', () => {
           howTo.style.transform = 'translate(-50%, -50%) scale(1.1)';
           howTo.style.transition = '0.3s';
        });
        howTo.addEventListener('mouseleave', () => {
           howTo.style.transform = 'translate(-50%, -50%) scale(1)';  
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
        howTo.style.display = 'none'

        
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
            restartButton.style.top = '52%'
            restartButton.style.transform = 'translate(-50%, -50%)'
            restartButton.style.fontSize = '4vw'
            restartButton.style.color = 'white'
            restartButton.style.fontFamily = 'Times New Roman'
            restartButton.style.backgroundColor = 'transparent'
            restartButton.style.borderRadius = '1.5vw'
            restartButton.style.padding = '0.8vw'
            restartButton.style.borderColor = 'white'

            deathWave.style.zIndex = '51'
            deathWave.style.position = 'absolute';
            deathWave.style.display = 'block';
            deathWave.textContent = `Congratulations! You survived ${this.game.wave} waves!` 
            deathWave.style.left = '50%';
            deathWave.style.top = '40%';
            deathWave.style.transform = 'translate(-50%, -50%)';
            deathWave.style.color = 'white';
            deathWave.style.fontSize = '3.1vw'
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

export class HowTo extends State {
    constructor(game) {
        super('howTo', game);
    }
    enter() {
        easy.style.display = 'none';
        medium.style.display = 'none';
        hard.style.display = 'none';
        howTo.style.display = 'none';
        title.style.display = 'none';
        subTitle.style.display = 'none';

        restartButton.style.display = 'block';
        restartButton.style.zIndex = '50'
        restartButton.style.position = 'absolute'
        restartButton.style.transform = 'translate(-50%, -50%)'
        restartButton.style.fontSize = '3vw'
        restartButton.style.color = 'white'
        restartButton.style.fontFamily = 'Times New Roman'
        restartButton.style.backgroundColor = 'transparent'
        restartButton.style.borderRadius = '1.5vw'
        restartButton.style.padding = '0.8vw'
        restartButton.style.borderColor = 'white'
        restartButton.style.top = '6%'
        restartButton.style.left = '6%'
        restartButton.textContent = 'Menu'

        restartButton.addEventListener('mouseenter', () => {
            restartButton.style.transform = 'translate(-50%, -50%) scale(1.1)';
            restartButton.style.transition = '0.3s';
        });
        restartButton.addEventListener('mouseleave', () => {
            restartButton.style.transform = 'translate(-50%, -50%) scale(1)';  
        });

        howToTitle.style.display = 'block';
        howToTitle.style.zIndex = '8';
        howToTitle.style.position = 'absolute';
        howToTitle.style.left = '50%';
        howToTitle.style.top = '8%';
        howToTitle.style.transform = 'translate(-50%, -50%)';
        howToTitle.style.color = 'white';
        howToTitle.style.fontSize = '5vw'

        controls.style.display = 'block';
        controls.style.zIndex = '8';
        controls.style.position = 'absolute';
        controls.style.left = '12%';
        controls.style.top = '25%';
        controls.style.transform = 'translate(-50%, -50%)';
        controls.style.color = 'white';
        controls.style.fontSize = '2vw'

        gameplay.style.display = 'block';
        gameplay.style.zIndex = '8';
        gameplay.style.position = 'absolute';
        gameplay.style.left = '80%';
        gameplay.style.top = '25%';
        gameplay.style.transform = 'translate(-50%, -50%)';
        gameplay.style.color = 'white';
        gameplay.style.fontSize = '2vw'

        tipsTricks.style.display = 'block';
        tipsTricks.style.zIndex = '8';
        tipsTricks.style.position = 'absolute';
        tipsTricks.style.left = '50%';
        tipsTricks.style.top = '25%';
        tipsTricks.style.transform = 'translate(-50%, -50%)';
        tipsTricks.style.color = 'white';
        tipsTricks.style.fontSize = '2vw'

        controlsBody.style.display = 'block';
        controlsBody.style.zIndex = '8';
        controlsBody.style.position = 'absolute';
        controlsBody.style.left = '15%';
        controlsBody.style.top = '43%';
        controlsBody.style.transform = 'translate(-50%, -50%)';
        controlsBody.style.color = 'white';
        controlsBody.style.fontSize = '1.5vw'
        controlsBody.style.lineHeight = '250%'

        gameplayBody.style.display = 'block';
        gameplayBody.style.zIndex = '8';
        gameplayBody.style.position = 'absolute';
        gameplayBody.style.left = '80%';
        gameplayBody.style.top = '41%';
        gameplayBody.style.transform = 'translate(-50%, -50%)';
        gameplayBody.style.color = 'white';
        gameplayBody.style.fontSize = '1.5vw'
        gameplayBody.style.lineHeight = '150%'
        gameplayBody.style.textAlign = 'left'

        tipsTricksBody.style.display = 'block';
        tipsTricksBody.style.zIndex = '8';
        tipsTricksBody.style.position = 'absolute';
        tipsTricksBody.style.left = '50%';
        tipsTricksBody.style.top = '43%';
        tipsTricksBody.style.transform = 'translate(-50%, -50%)';
        tipsTricksBody.style.color = 'white';
        tipsTricksBody.style.fontSize = '1.5vw'
        tipsTricksBody.style.lineHeight = '200%'
    }
    
}  