import Main from './js/main'

if (module.hot) {
  module.hot.accept();
}

new Main(document.getElementById("view"));