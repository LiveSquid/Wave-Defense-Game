import { waves } from "./main.js"

// Shop Costs
const heal = [50, 200]
const maxHealthPrices = [50, 100, 250, 800, 2000, 'Max']
const maxHealthUpgrades = [125, 175, 250, 350, 500]
const damagePrices = [100, 200, 500, 2000, 5000, 'Max']
const damageUpgrades = [10, 20, 30, 40, 100]
const rangePrices = [300, 600, 1500, 6000, 20000, 'Max']
const rangeUpgrades = [10, 15, 20, 25, 50]
const speedPrices = [50, 80, 200, 500, 1000, 'Max']
const speedUpgrades = [10, 10, 20, 30, 40]
const comboPrices = [2500,' ']
const goldPrices = [300, 600, 1500, 6000, 20000, 'Max']
const goldUpgrades = [100, 100, 200, 300, 500]


export class UI {
    constructor(game, ctx) {
        this.game = game;
        this.buttonWidth = 95
        this.buttonHeight = 55;
        this.offset = 5;
        this.Pause = false;
        this.Shop = false;
        this.Heal = false;
        this.MaxHealth = false;
        this.DMG = false;
        this.Range = false;
        this.Speed = false;
        this.Combo = false;
        this.Gold = false;
        this.shopWidth = 1275;
        this.shopHeight = 600;
        this.bitcoin = bitcoin;
        this.sword = sword;
        this.speedI = speed;
        this.healthBarHeight = 30;
        this.healthBarWidth = 750;
        this.gold = 0;
        this.maxHealthCounter = 0;
        this.healCounter = 0;
        this.damageCounter = 0;
        this.rangeCounter = 0;
        this.speedCounter = 0;
        this.comboCounter = 0;
        this.goldCounter = 0;
    }
    draw(ctx) {
        // GOLD
        ctx.drawImage(this.bitcoin, 0, 0, 50, 50);
        ctx.fillStyle = '#ffcc33';
        ctx.font = '40px Serif'; 
        ctx.fillText( `${this.gold}`, 95, 27)

        // Wave
        ctx.fillStyle = 'black';
        ctx.font = '40px Serif'; 
        ctx.fillText( `Wave: ${this.game.wave}`, 755, 27)

        ctx.fillStyle = '#3495eb';
        ctx.fillRect(550, 50, this.game.waveBarWidth, this.game.wavebarHeight);
        ctx.fillStyle = '#286da8';
        ctx.fillRect(550, 50, this.game.waveBarWidth - this.game.waveBarRevealWidth, this.game.wavebarHeight);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(550, 50, this.game.waveBarWidth, this.game.wavebarHeight);

        // Health Bar
        ctx.fillStyle = '#fc1c03';
        ctx.fillRect(375, 730, this.healthBarWidth, this.healthBarHeight);
        if (this.game.player.health > 0) {
            ctx.fillStyle = '#52fc03';
            ctx.fillRect(375, 730, this.healthBarWidth - (this.healthBarWidth / (this.game.player.maxHealth/ (this.game.player.maxHealth - this.game.player.health))), this.healthBarHeight);
        }
        ctx.strokeStyle = 'black';
        ctx.strokeRect(375, 730, this.healthBarWidth, this.healthBarHeight);
        ctx.fillStyle = 'black'
        ctx.font = '20px Serif'; 
        ctx.fillText(`${this.game.player.health} / ${this.game.player.maxHealth}`, 740,745)

        // Shop and Pause Buttons
        this.drawButton(ctx, this.game.width - this.buttonWidth - this.offset, 0 + this.offset, this.buttonWidth, this.buttonHeight, 'Pause', 'white', 'black');
        this.drawButton(ctx, this.game.width - (this.buttonWidth * 2) - (this.offset * 2), 0 + this.offset, this.buttonWidth, this.buttonHeight, 'Shop', 'white', 'black');

        if (this.game.player.maxHealth === 500) this.healCounter = 1;
    }
    drawButton(ctx, x, y, width, height, text, color, color2) {
       
        if (!this[text]) ctx.fillStyle = `${color}`;
        else ctx.fillStyle = `${color2}`;
        ctx.fillRect(x, y, width, height);
        
        ctx.lineJoin = 'bevel';
        if (text === 'Shop' || text === 'Pause') {
            ctx.strokeStyle = `${color2}`;
        } 
        else {
            if (!this[text]) ctx.strokeStyle = `${color2}`;
            else ctx.strokeStyle = `${color}`;
        }
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);

        if (!this[text]) ctx.fillStyle = `${color2}`;
        else ctx.fillStyle = `${color}`;
        ctx.font = '30px Serif'; 
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x + width / 2, y + height / 2);
    }
    insideButton(mouseX, mouseY, x, y, width, height) {
        return mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height;
    }
    testForButton() {
        // Pause
        if (this.insideButton(this.game.input.mouse.x, this.game.input.mouse.y, this.game.width - this.buttonWidth - this.offset,0 + this.offset, this.buttonWidth, this.buttonHeight)) this.Pause = true; 
        else this.Pause = false;
        // Shop
        if (this.insideButton(this.game.input.mouse.x, this.game.input.mouse.y, this.game.width - (this.buttonWidth * 2) - (this.offset * 2),0 + this.offset, this.buttonWidth, this.buttonHeight)) this.Shop = true;
        else this.Shop = false;
        // Heal
        if (this.insideButton(this.game.input.mouse.x, this.game.input.mouse.y,  200, 128, this.buttonWidth, this.buttonHeight)) this.Heal = false;
        else this.Heal = true;
        //MaxHealth
        if (this.insideButton(this.game.input.mouse.x, this.game.input.mouse.y, 200, 198, this.buttonWidth + 60, this.buttonHeight)) this.MaxHealth = false;
        else this.MaxHealth = true;
        // Damage
        if (this.insideButton(this.game.input.mouse.x, this.game.input.mouse.y, 200, 268, this.buttonWidth + 60, this.buttonHeight)) this.DMG = false;
        else this.DMG = true;
        // Range
        if (this.insideButton(this.game.input.mouse.x, this.game.input.mouse.y, 200, 338, this.buttonWidth + 60, this.buttonHeight)) this.Range = false;
        else this.Range = true;
        // Speed
        if (this.insideButton(this.game.input.mouse.x, this.game.input.mouse.y, 200, 408, this.buttonWidth + 60, this.buttonHeight)) this.Speed = false;
        else this.Speed = true;
        // Combo
        if (this.insideButton(this.game.input.mouse.x, this.game.input.mouse.y, 700, 128, this.buttonWidth + 60, this.buttonHeight)) this.Combo = false;
        else this.Combo = true;
        // Gold
        if (this.insideButton(this.game.input.mouse.x, this.game.input.mouse.y, 200, 478, this.buttonWidth + 60, this.buttonHeight)) this.Gold = false;
        else this.Gold = true;
    }
    testForButtonOnClick() {
        // Pause
        if (this.insideButton(this.game.input.mouse.x, this.game.input.mouse.y, this.game.width - this.buttonWidth - this.offset,0 + this.offset, this.buttonWidth, this.buttonHeight)) {
            if (this.game.gameRunning) {
                this.game.setState(2)
            }
            else {
                this.game.setState(1)
            }
        }
        // Shop
        else if (this.insideButton(this.game.input.mouse.x, this.game.input.mouse.y, this.game.width - (this.buttonWidth * 2) - (this.offset * 2),0 + this.offset, this.buttonWidth, this.buttonHeight)) {
            if (this.game.gameRunning) {
                this.game.setState(4)
            }
            else if (!this.game.gameRunning && this.game.currentState.state === 'paused'){
                this.game.setState(4)
            }
            else this.game.setState(1)
        }
        // Heal
        else if (this.insideButton(this.game.input.mouse.x, this.game.input.mouse.y,  200, 128, this.buttonWidth, this.buttonHeight)) {
            if (this.gold >= heal[this.healCounter]) {
                if (this.game.player.health < this.game.player.maxHealth) {
                this.game.player.health = this.game.player.maxHealth;
                this.gold -= heal[this.healCounter];
                }
            }
        }
        // Max Health
        else if (this.insideButton(this.game.input.mouse.x, this.game.input.mouse.y, 200, 198, this.buttonWidth + 60, this.buttonHeight)) {
            if (this.gold >= maxHealthPrices[this.maxHealthCounter]) {
                if (this.maxHealthCounter <= 4) {
                    this.game.player.maxHealth = maxHealthUpgrades[this.maxHealthCounter]
                    this.game.player.health = this.game.player.maxHealth;
                    this.gold -= maxHealthPrices[this.maxHealthCounter];
                    this.maxHealthCounter ++;
                }
            }
        }
        // Damage
        else if (this.insideButton(this.game.input.mouse.x, this.game.input.mouse.y, 200, 268, this.buttonWidth + 60, this.buttonHeight)) {
            if (this.gold >= damagePrices[this.damageCounter]) {
                if (this.damageCounter <= 4) {
                    this.game.player.damage += this.game.player.damage * (damageUpgrades[this.damageCounter] / 100);
                    this.game.player.comboDamage += this.game.player.comboDamage * (damageUpgrades[this.damageCounter] / 100);
                    this.gold -= damagePrices[this.damageCounter];
                    this.damageCounter ++;
                }
            }
        }
        // Range
        else if (this.insideButton(this.game.input.mouse.x, this.game.input.mouse.y, 200, 338, this.buttonWidth + 60, this.buttonHeight)) {
            if (this.gold >= rangePrices[this.rangeCounter]) {
                if (this.rangeCounter <= 4) {
                    this.game.player.widthHitboxAttack += this.game.player.widthHitboxAttack * (rangeUpgrades[this.rangeCounter] / 100);
                    this.game.player.widthHitboxCombo += this.game.player.widthHitboxCombo * (rangeUpgrades[this.rangeCounter] / 100);
                    this.gold -= rangePrices[this.rangeCounter];
                    this.rangeCounter ++;
                }
            }
        }
        // Speed
        else if (this.insideButton(this.game.input.mouse.x, this.game.input.mouse.y, 200, 408, this.buttonWidth + 60, this.buttonHeight)) {
            if (this.gold >= speedPrices[this.speedCounter]) {
                if (this.speedCounter <= 4) {
                    this.game.player.maxSpeed += this.game.player.maxSpeed * (speedUpgrades[this.speedCounter] / 100);
                    this.game.player.speed = this.game.player.maxSpeed;
                    this.gold -= speedPrices[this.speedCounter];
                    this.speedCounter ++;
                }
            }
        }
        // Combo
        else if (this.insideButton(this.game.input.mouse.x, this.game.input.mouse.y, 700, 128, this.buttonWidth + 60, this.buttonHeight)) {
            if (this.gold >= comboPrices[this.comboCounter]) {
                if (this.comboCounter === 0) {
                    this.game.player.combo = true;
                    this.gold -= comboPrices[this.comboCounter];
                    this.comboCounter ++;
                }
            }
        }
        // Gold
        else if (this.insideButton(this.game.input.mouse.x, this.game.input.mouse.y, 200, 478, this.buttonWidth + 60, this.buttonHeight)) {
            if (this.gold >= goldPrices[this.goldCounter]) {
                if (this.goldCounter <= 4) {
                    this.game.difficulty += this.game.difficulty * (goldUpgrades[this.goldCounter] / 100);
                    this.gold -= goldPrices[this.goldCounter];
                    this.goldCounter ++;
                }
            }
        }
        else {
           this.game.player.attack();
        }      
    }
    shop(ctx) {
        //Background
        ctx.fillStyle = '#a5abb5';
        ctx.fillRect(112.5, 100, this.shopWidth, this.shopHeight);
        ctx.strokeStyle = '#303133'
        ctx.lineWidth = '3';
        ctx.lineJoin = 'bevel';
        ctx.strokeRect(112.5, 100, this.shopWidth, this.shopHeight);

        // Heal
        ctx.fillStyle = '#07f53f'
        ctx.fillRect(152.5, 150, 40, 10)
        ctx.fillRect(167.5, 135, 10, 40)
        this.drawButton(ctx, 200, 128, this.buttonWidth + 60, this.buttonHeight, 'Heal', 'white', 'red')
        ctx.fillStyle = '#ffcc33';
        ctx.font = '40px Serif'; 
        ctx.fillText(heal[this.healCounter], 460, 155)

        // Max Health
        ctx.fillStyle = '#07f53f'
        ctx.fillRect(152.5, 220, 40, 10)
        ctx.fillRect(167.5, 205, 10, 40)
        this.drawButton(ctx, 200, 198, this.buttonWidth + 60, this.buttonHeight, 'MaxHealth', 'white', 'red')
        ctx.fillStyle = '#ffcc33';
        ctx.font = '40px Serif'; 
        ctx.fillText(maxHealthPrices[this.maxHealthCounter], 460, 225)
        if (this.maxHealthCounter <=4 ) {
            ctx.fillStyle = 'black';
            ctx.font = '20px Serif';
            ctx.fillText(`+${maxHealthUpgrades[this.maxHealthCounter] - this.game.player.maxHealth}`, 378, 225)
        }

        // Damage
        ctx.drawImage(this.sword, 147, 265, 30, 60);
        this.drawButton(ctx, 200, 268, this.buttonWidth + 60, this.buttonHeight, 'DMG', 'white', '#212121')
        ctx.fillStyle = '#ffcc33';
        ctx.font = '40px Serif';
        ctx.fillText(damagePrices[this.damageCounter], 460, 295)
        if (this.damageCounter <= 4 ) {
            ctx.fillStyle = 'black';
            ctx.font = '20px Serif';
            ctx.fillText(`+${damageUpgrades[this.damageCounter]}%`, 385, 295)
        }
        
        // Range
        ctx.save();
        ctx.translate(173.5, 165);
        ctx.rotate(Math.PI / 4);
        ctx.translate(-173.5, -165);
        ctx.drawImage(this.sword, 297, 280, 30, 60);
        ctx.restore();
        this.drawButton(ctx, 200, 338, this.buttonWidth + 60, this.buttonHeight, 'Range', 'white', '#212121')
        ctx.fillStyle = '#ffcc33';
        ctx.font = '40px Serif';
        ctx.fillText(rangePrices[this.rangeCounter], 460, 365)
        if (this.rangeCounter <= 4 ) {
            ctx.fillStyle = 'black';
            ctx.font = '20px Serif';
            ctx.fillText(`+${rangeUpgrades[this.rangeCounter]}%`, 385, 365)
        }

        // Speed
        ctx.drawImage(this.speedI, 148.5, 410, 45, 45);
        this.drawButton(ctx, 200, 408, this.buttonWidth + 60, this.buttonHeight, 'Speed', 'white', '#fff200')
        ctx.fillStyle = '#ffcc33';
        ctx.font = '40px Serif';
        ctx.fillText(speedPrices[this.speedCounter], 460, 435)
        if (this.speedCounter <= 4 ) {
            ctx.fillStyle = 'black';
            ctx.font = '20px Serif';
            ctx.fillText(`+${speedUpgrades[this.speedCounter]}%`, 385, 435)
        }

         // Combo
         ctx.save();
         ctx.translate(338.5, 35);
         ctx.rotate(Math.PI / 4);
         ctx.translate(-338.5, -35);
         ctx.drawImage(this.sword, 639, -142, 30, 60);
         ctx.restore();
         ctx.save();
         ctx.translate(0, 0);
         ctx.rotate(7 * (Math.PI / 4));
         ctx.translate(-0, -0);
         ctx.drawImage(this.sword, 350, 554, 30, 60);
         ctx.restore();
         this.drawButton(ctx, 700, 128, this.buttonWidth + 60, this.buttonHeight, 'Combo', 'white', '#245af0')
         ctx.fillStyle = '#ffcc33';
         ctx.font = '40px Serif'; 
         ctx.fillText(comboPrices[this.comboCounter], 960, 155)

        // Gold
        ctx.drawImage(this.bitcoin, 148.5, 480, 45, 45);
        this.drawButton(ctx, 200, 478, this.buttonWidth + 60, this.buttonHeight, 'Gold', 'white', '#ffcc33')
        ctx.fillStyle = '#ffcc33';
        ctx.font = '40px Serif';
        ctx.fillText(goldPrices[this.goldCounter], 460, 505)
        if (this.goldCounter <= 4 ) {
            ctx.fillStyle = 'black';
            ctx.font = '20px Serif';
            ctx.fillText(`+${goldUpgrades[this.goldCounter]}%`, 385, 505)
        }
    }
}