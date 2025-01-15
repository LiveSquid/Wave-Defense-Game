export class Background {
    constructor(game) {
        this.game = game;
        this.image = grass;
    }
    update() {

    }
    draw(ctx) {
        ctx.drawImage(this.image, 0, 0, 1500, 800);
    }
}