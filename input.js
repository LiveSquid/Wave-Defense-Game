export class Input {
    constructor(game) {
        this.game = game;
        this.keys = [];
        this.clicks = [];
        this.mouse = {
            x: 0,
            y: 0,
        }

        window.addEventListener('keydown', (e) => {
            if ((e.key === 's' ||
                 e.key === 'w' ||
                 e.key === 'a' ||
                 e.key === 'd' ||
                 e.key === ' ' ||
                 e.key === 'Shift'
                ) && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 's' ||
                e.key === 'w' ||
                e.key === 'a' ||
                e.key === 'd' ||
                e.key === ' ' ||
                e.key === 'Shift') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });

        window.addEventListener('mousedown', (e) => {
            // Check for left or right mouse button
            if (e.button === 0 && this.clicks.indexOf('mouseLeft') === -1) {
                this.clicks.push('mouseLeft');
            } else if (e.button === 2 && this.clicks.indexOf('mouseRight') === -1) {
                this.clicks.push('mouseRight');
            }
        });
        
        window.addEventListener('mouseup', (e) => {
            if (e.button === 0) {
                this.clicks.splice(this.clicks.indexOf('mouseLeft'), 1);
            } else if (e.button === 2) {
                this.clicks.splice(this.clicks.indexOf('mouseRight'), 1);
            }
        });

        window.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        window.addEventListener('mousemove', (e) => {
           this.mouse.x = e.offsetX;
           this.mouse.y = e.offsetY;
        });
        
    }
}