/* eslint-disable */
import Core from './views/Core'
import createjs from 'createjs-module'

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

        circle.addEventListener("mouseover", (e) => {
            let target = e.target;
            
            // target.userData.c.radius = 100;
            target.userData.f.style = "tomato";

            createjs.Tween.get(target.userData.c)
            .to({radius: 100}, 500, createjs.Ease.get(0.5));
        })

        this.stage.addChild(circle);

        // function handleMouseOver(e) {
        //     console.log(e.target);
        //     console.log(circle);
        //     console.log(circle.graphics);
        // }
                
        // circle.onmouseover = 


        createjs.Tween.get(circle ) //{ loop: true }
        .to({x:300}, 250, createjs.Ease.get(-1))
        .to({y:300}, 500, createjs.Ease.get(1));

        this.stage.update();
    }
}

export default Main;