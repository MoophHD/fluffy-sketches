/* eslint-disable */
import Core from './views/Core'
import createjs from 'createjs-module'

import GridElement from './components/GridElement'

class Main extends Core {
    constructor(canvas) {
        super(canvas);

        this.container = new createjs.Container();
        this.shapesX = 10;
        this.shapesY = 3;
        this.gap = 1;
        this.type = "circle";

        this.container.setBounds(0,0,this.screenBounds.w,this.screenBounds.h);

        this.stage.addChild(this.container);
        this.stage.enableMouseOver(25);
        this.container.addEventListener("mouseover", (e) => {
            let target = e.target;
            if (target.userData) target.userData.wave(1);
        })


    }

    render() {
        let shape = new GridElement(500, 500, "circle", {radius: 100});
        shape.shape.addEventListener("mouseout", this._onElemReset.bind(this));
        console.log(shape);
        shape.init(this.stage);
    }

    render() { 
        const SHAPES_X = this.shapesX;
        const SHAPES_Y = this.shapesY;
        const GAP = this.gap;
        const TYPE = this.type;
        
        let container = this.container;
        container.removeAllChildren();

        // let shapeH = ~~((container.getBounds().height-(SHAPES_Y-1)*GAP)/SHAPES_Y);
        // let shapeW = ~~((container.getBounds().width-(SHAPES_X-1)*GAP)/SHAPES_X);
        let props, shapeX, shapeY;
        if (TYPE == "square") {
            shapeY = (container.getBounds().height-(SHAPES_Y-1)*GAP)/SHAPES_Y;
            shapeX = (container.getBounds().width-(SHAPES_X-1)*GAP)/SHAPES_X;
    
            props = {width:shapeX, height:shapeY};
        } else if (TYPE == "circle") {
            shapeX = shapeY = Math.min((container.getBounds().height-(SHAPES_Y-1)*GAP)/SHAPES_Y, (container.getBounds().width-(SHAPES_X-1)*GAP)/SHAPES_X);

            props = {radius: shapeX};
        } else {
            return;
        }

        let shapesArr = [],x,y;
        x = shapeX/2;
        y = shapeY/2;
        for (let i = 0; i < SHAPES_Y; i++) {
            shapesArr[i] = [];
            x = shapeX/2;
            for (let j = 0; j < SHAPES_X; j++) {
                shapesArr[i][j] = new GridElement(x, y, TYPE, props);
                shapesArr[i][j].init(container);
                shapesArr[i][j].shape.addEventListener("mouseout", this._onElemReset.bind(this));
                x = x+shapeX+GAP;
            }
            y = y+shapeY+GAP;
        }

        let lastGridElem =  shapesArr[SHAPES_Y-1][SHAPES_X-1];
        container.x = (this.screenBounds.w - lastGridElem._posX  - lastGridElem._shapeType.w/2)/2;
        container.y = (this.screenBounds.h - lastGridElem._posY - lastGridElem._shapeType.h/2)/2;
        
        console.log(container);
        this.stage.update();
    }

    _onElemReset(e) {
        e.target.userData.reset();
    }
}

export default Main;