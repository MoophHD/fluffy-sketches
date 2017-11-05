import Core from './views/Core'
import createjs from 'createjs-module'

class Main extends Core {
    constructor(canvas) {
        super(canvas);

        let circle = new createjs.Shape();
        // circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
        circle.graphics.beginFill("Tomato").drawCircle(0, 0, 50);
        circle.x = 100;
        circle.y = 100;
        this.stage.addChild(circle);
      
        this.stage.update();

        createjs.Tween.get(circle)
        .to({x:300}, 1000)
        .to({y:300}, 500);
    }
}

export default Main;