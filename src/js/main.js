/* eslint-disable */
import Core from './views/Core'
import createjs from 'createjs-module'

import GridElement from './components/GridElement'

class Main extends Core {
    constructor(canvas) {
        super(canvas);

        let circle = new createjs.Shape();
        let myGraphics = new createjs.Graphics();
        
        let fillObj = myGraphics.beginFill("DeepSkyBlue").command;
        let circleObj = myGraphics.drawCircle(0, 0, 50).command;
      
        circle.graphics.append(createjs.Graphics.beginCmd)
        .append(circleObj)
        .append(fillObj);

        circle.x = 100;
        circle.y = 100;

        circle.userData = {};
        circle.userData.f = fillObj;
        circle.userData.c = circleObj;

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
                shapesArr[i][j].init(this.stage);
                shapesArr[i][j].shape.addEventListener("mouseout", (e) => {
                    e.target.userData.reset();
                })
                x = x+ shapeW+GAP;
            }
            y = y + shapeH+GAP;
        }


        // let shape = new GridElement(500, 250, "square", {height: 100, width: 50});
        // shape.init(this.stage);

        this.stage.enableMouseOver(25);
        this.stage.addEventListener("mouseover", (e) => {
            let target = e.target;
            target.userData.wave(1);

        })


        this.stage.update();
    }
}

export default Main;