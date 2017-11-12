import Main from './js/main'
import * as DAT from 'dat.gui/build/dat.gui.js'

if (module.hot) {
  module.hot.accept();
}

let firstCall = true;

window.onload = () => {
  let view = new Main(document.getElementById("view")); 
  view.render();
   
  if (firstCall) {
    let gui = new DAT.GUI();
    gui.onChange = function (f) {
      var i, j;
      for (i in this.__controllers) this.__controllers[i].onChange (f);
      for (i in this.__folders) for (j in this.__folders[i].__controllers) this.__folders[i].__controllers[j].onChange (f);
    };

    gui.add(view, 'type');
    gui.add(view, 'shapesX');
    gui.add(view, 'shapesY');
    gui.add(view, 'gap');
    gui.onChange(() => {view.render()});
    firstCall = false;
  }
}