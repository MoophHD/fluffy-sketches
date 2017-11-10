import createjs from 'createjs-module'
import parseRgb from '../gist/parseRgb'

class GridElement {

    /**
     * 
     * @param {float} posX 
     * @param {float} posY 
     * @param {string} type 
     * @param {obj} props 
     */

    constructor(posX, posY, type, props) {
        let boldGraphics = new createjs.Graphics();
        this._shape = new createjs.Shape();

        this.reg = {};

        this._shapeColor = boldGraphics.beginFill(createjs.Graphics.getRGB(0, 191, 255)).command;
        this._shapeType;
        switch(type) {
            case "square":
                this.reg.x = props.width/2;
                this.reg.y = props.height/2;
                this._shapeType = boldGraphics.drawRect( 0, 0, props.width, props.height ).command;
                break;
            case "circle":
                this.reg.x = this.reg.y = props.radius/2;
                this._shapeType = boldGraphics.drawCircle( 0, 0, props.radius ).command;
                break;
            default:
                this._shapeType = boldGraphics.drawCircle( 0, 0, props.width, props.height ).command;
        }

        this._shape.graphics.append( createjs.Graphics.beginCmd )
        .append(this._shapeType)
        .append(this._shapeColor);

        
        this._shape.userData = {};
        this._shape.userData.shape = this._shapeType;
        this._shape.userData.wave = this.wave.bind(this);
        this._shape.userData.reset = this.reset.bind(this);
        
        
        this._shape.x = posX;
        this._shape.y = posY;
        
        this._posX = posX;
        this._posY = posY;
        this.MAX_SCALE = 1.45;
        this.MAX_DARKENCOLOR = 1.3;
        this.shapeTypeStr = type;
        console.log(this._shapeColor)
        this.startColor = parseRgb(this._shapeColor.style);

        this.animating = false;
        this.scale = 1;
    }  

    wave(coef=1) {
        this.animateScale(coef*this.MAX_SCALE);

        let clCoef = coef*this.MAX_DARKENCOLOR;
        let clTo = {...parseRgb(this._shapeColor.style)};
        clTo.r = Math.min(clTo.r*clCoef, 256);
        clTo.g = Math.min(clTo.g*clCoef, 256);
        clTo.b = Math.min(clTo.b*clCoef, 256);

        this.animateColor(clTo);
    }

    reset() {
        if (this.scale == 1) return;

        this.animateScale(1);  
        this.animateColor(this.startColor);      
    }

    animateColor(to) {
        let startCl = parseRgb(this._shapeColor.style);

        createjs.Tween.get(startCl)
        .to(to,
        350, createjs.Ease.get(1))
        .addEventListener("change", () => {
            this._shape.graphics.command.style = createjs.Graphics.getRGB(~~(startCl.r), ~~(startCl.g), ~~(startCl.b));
        })
        .call(() => this.animating = false)
    }
    
    animateScale(to) {
        // if (this.animating) return;

        this.scale = to;
        this.animating = true;

        createjs.Tween.get(this._shape)
        .to({
            scaleX: to,
            scaleY: to}, 
        350, createjs.Ease.get(1))
        .call(() => this.animating = false)
    }

    get shape() {
        return this._shape;
    }

    init(scene) {
        scene.addChild(this._shape)
        this._shape.regX = this.reg.x;
        this._shape.regY = this.reg.y;
    }
}

export default GridElement;