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

        let shape = new GridElement(500, 250, "square", {height: 100, width: 50});
        shape.init(this.stage);

        this.stage.enableMouseOver(25);
        this.stage.addEventListener("mouseover", (e) => {
            let target = e.target;
            console.log(target);
            target.userData.wave(1);
            
            addEventListener("mouseout", () => {
                console.log('waveout');
                target.userData.wave(0.25);
            })
        })


        this.stage.update();
    }
}

export default Main;