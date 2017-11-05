import createjs from 'createjs-module'

class Core {
    constructor(canvas) {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        this._canvas = canvas;
        
        this.stage = new createjs.Stage(canvas);
        
        createjs.Ticker.setFPS(25);
        createjs.Ticker.addEventListener("tick", this.update.bind(this));

        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
    }

    onWindowResize() {
        this._canvas.height = window.innerHeight;
        this._canvas.width = window.innerWidth;
    }

    update(event) {
        this.stage.update(event);
    }
}

export default Core;