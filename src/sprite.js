// thanks https://github.com/jlongster for this code 

export default class Sprite {

    constructor (options) {
        this.img = options.img;
        this.pos = options.pos;
        this.size = options.size;
        this.speed = typeof options.speed === 'number' ? options.speed : 0;
        this.frames = options.frames;
        this.once = options.once;
        this.gameSize = options.gameSize;
        this.dir = options.dir || 'horizontal';
        this._index = 0;
    }

    update (dt) {
        this._index += this.speed*dt;
    }

    render (ctx, coords, callback) {
        let frame;

        if (this.speed > 0) {
            const max = this.frames.length,
                idx = Math.floor(this._index);

            frame = this.frames[idx % max];

            if (this.once && idx >= max) {
                this.done = true;
                callback();
                return;
            }
        }
        else {
            frame = 0;
        }


        let x = this.pos[0],
            y = this.pos[1];

        if (this.dir == 'vertical') {
            y += frame * this.size[1];
        }
        else {
            x += frame * this.size[0];
        }
        ctx.drawImage(this.img,
                      x, y,
                      this.size[0], this.size[1],
                      coords.x, coords.y,
                      this.gameSize, this.gameSize);
    }
}   