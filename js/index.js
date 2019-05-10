window.onload = function () {

  document.getElementById('button').onclick = () => {
    document.getElementById('init').style.display = 'none'
    document.getElementById('canvas').style.display = 'block'
    Game.init("canvas");
  }
  document.getElementById('button2').onclick = () => {
    document.getElementById('gameO').style.display = 'none'
    document.getElementById('init').style.display = 'block'
    document.getElementById('canvas').style.display = 'block'
    Game.start();
  }

  document.getElementById('button3').onclick = () => {
    document.getElementById('youWin').style.display = 'none'
    document.getElementById('init').style.display = 'block'
    document.getElementById('canvas').style.display = 'block'
    Game.start();

  }

};

