import createjs from 'createjs-module'

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

        this._shapeColor = boldGraphics.beginFill("DeepSkyBlue").command;
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
        this._shape.userData.color = this._shapeColor;
        this._shape.userData.shape = this._shapeType;
        this._shape.userData.wave = this.wave.bind(this);

        this._shape.x = posX;
        this._shape.y = posY;
        
        this.MAX_SCALE = 1.75;
        this.MAX_DARKENCOLOR = 1.5;
        this.shapeTypeStr = type;
    }  

    wave(coef=1) {
        createjs.Tween.get(this._shape)
        .to({
            scaleX: coef*this.MAX_SCALE,
            scaleY: coef*this.MAX_SCALE}, 
        350, createjs.Ease.get(1));

    }

    init(scene) {
        scene.addChild(this._shape)

        this._shape.regX = this.reg.x;
        this._shape.regY = this.reg.y;
    }
}

export default GridElement;