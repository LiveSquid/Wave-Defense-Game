// Shop Costs
const heal = [50, 200]
const maxHealthPrices = [50, 100, 250, 800, 2000, 'Max']
const maxHealthUpgrades = [125, 175, 250, 350, 500]
const damagePrices = [100, 200, 500, 2000, 5000, 'Max']
const damageUpgrades = [10, 20, 30, 40, 100]
const speedPrices = [50, 80, 200, 500, 1000, 'Max']
const speedUpgrades = [10, 10, 20, 30, 40]


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
        this.Speed = false;
        this.shopWidth = 1275;
        this.shopHeight = 600;
        this.bitcoin = bitcoin;
        this.sword = sword;
        this.speed = speed;
        this.healthBarHeight = 30;
        this.healthBarWidth = 750;
        this.gold = 55500;
        this.maxHealthCounter = 0;
        this.healCounter = 0;
        this.damageCounter = 0;
        this.speedCounter = 0;
    }

    draw(ctx) {
        // GOLD
        ctx.drawImage(this.bitcoin, 0, 0, 50, 50);
        ctx.fillStyle = '#ffcc33';
        ctx.font = '40px Serif'; 
        ctx.fillText( `${this.gold}`, 95, 27)

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
        // Speed
        if (this.insideButton(this.game.input.mouse.x, this.game.input.mouse.y, 200, 338, this.buttonWidth + 60, this.buttonHeight)) this.Speed = false;
        else this.Speed = true;
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
        // Speed
        else if (this.insideButton(this.game.input.mouse.x, this.game.input.mouse.y, 200, 338, this.buttonWidth + 60, this.buttonHeight)) {
            if (this.gold >= speedPrices[this.speedCounter]) {
                if (this.speedCounter <= 4) {
                    this.game.player.maxSpeed += this.game.player.maxSpeed * (speedUpgrades[this.speedCounter] / 100);
                    this.game.player.speed = this.game.player.maxSpeed;
                    this.gold -= damagePrices[this.speedCounter];
                    this.speedCounter ++;
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
        this.drawButton(ctx, 200, 128, this.buttonWidth, this.buttonHeight, 'Heal', 'white', 'red')
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
        ctx.drawImage(this.sword, 147, 270, 50, 50);
        this.drawButton(ctx, 200, 268, this.buttonWidth + 60, this.buttonHeight, 'DMG', 'white', '#212121')
        ctx.fillStyle = '#ffcc33';
        ctx.font = '40px Serif';
        ctx.fillText(damagePrices[this.damageCounter], 460, 295)
        if (this.damageCounter <= 4 ) {
            ctx.fillStyle = 'black';
            ctx.font = '20px Serif';
            ctx.fillText(`+${damageUpgrades[this.damageCounter]}%`, 385, 295)
        }
        
        // Speed
        ctx.drawImage(this.speed, 148.5, 340, 45, 45);
        this.drawButton(ctx, 200, 338, this.buttonWidth + 60, this.buttonHeight, 'Speed', 'white', '#fff200')
        ctx.fillStyle = '#ffcc33';
        ctx.font = '40px Serif';
        ctx.fillText(speedPrices[this.speedCounter], 460, 365)
        if (this.speedCounter <= 4 ) {
            ctx.fillStyle = 'black';
            ctx.font = '20px Serif';
            ctx.fillText(`+${speedUpgrades[this.speedCounter]}%`, 385, 365)
        }
    }
}