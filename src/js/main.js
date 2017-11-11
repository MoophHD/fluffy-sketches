/* eslint-disable */
import Core from './views/Core'
import createjs from 'createjs-module'

import GridElement from './components/GridElement'

class Main extends Core {
    constructor(canvas) {
        super(canvas);
        
        let shapeContainer = new createjs.Container();
        this.stage.addChild(shapeContainer);

        const SHAPES_X = 10;
        const SHAPES_Y = 3;

        const GAP = 1;

        let shapeH = ~~(this.screenBounds.h/SHAPES_Y)-(SHAPES_Y-1)*GAP;
        let shapeW = ~~(this.screenBounds.w/SHAPES_X)-(SHAPES_X-1)*GAP;

        let shapesArr = [],x,y;
        x = shapeW/2;
        y = shapeH/2;
        for (let i = 0; i < SHAPES_Y; i++) {
            shapesArr[i] = [];
            x = shapeW/2;
            for (let j = 0; j < SHAPES_X; j++) {
                shapesArr[i][j] = new GridElement(x, y, "square", {width:shapeW, height:shapeH});
                shapesArr[i][j].init(shapeContainer);
                shapesArr[i][j].shape.addEventListener("mouseout", (e) => {
                    e.target.userData.reset();
                })
                x = x+shapeW+GAP;
            }
            y = y+shapeH+GAP;
        }

        let lastGridElem =  shapesArr[SHAPES_Y-1][SHAPES_X-1];
        console.log(lastGridElem);
        console.log(shapeContainer);
        shapeContainer.x = (this.screenBounds.w - lastGridElem._posX  - lastGridElem._shapeType.w/2)/2; // - lastGridElem._shapeType.w
        shapeContainer.y = (this.screenBounds.h - lastGridElem._posY - lastGridElem._shapeType.h/2)/2;
        

        this.stage.enableMouseOver(25);
        this.stage.addEventListener("mouseover", (e) => {
            let target = e.target;
            target.userData.wave(1);

        })


        this.stage.update();
    }
}

export default Main;