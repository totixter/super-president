var Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  scoreBoard: undefined,
  keys: {
    JUMP_P1: 87,
    RIGHT_P1: 68,
    LEFT_P1: 65,
    SHOOT_P1: 90,
    PUNCH_P1: 88,
    KICK_P1: 67,
    JUMP_P2: 38,
    RIGHT_P2: 39,
    LEFT_P2: 37,
    SHOOT_P2: 188,
    PUNCH_P2: 190,
    KICK_P2: 191,

  },
  init: function (canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;
    this.gameStartSound = new Audio()
    this.gameStartSound.src = "sounds/startgame.wav"
    this.gameStartSound.play();


    this.start();

  },
  start: function () {

    this.reset();

    this.interval = setInterval(() => {
      this.clear();

      this.framesCounter++;

      // controlamos que frameCounter no sea superior a 1000
      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }

      // controlamos la velocidad de generación de obstáculos
      if (this.framesCounter % 60 === 0) {
        this.score -= 1;
        console.log(this.score)
      }
      // }

      //

      // if (this.mainTune.ended) {
      //   this.mainTune.currenTime = 0
      //   this.mainTune.play()
      // }

      this.moveAll();
      this.drawAll();

      this.checksWinner();
      this.isCollision();


      // eliminamos obstáculos fuera del canvas
      //this.clearObstacles();

      // if (this.isCollision()) {
      //   this.gameOver();
      // }
    }, 1000 / this.fps);
  },


  checksWinner: function () {

    if (this.player.hp <= 0) {
      document.getElementById('canvas').style.display = 'none'
      document.querySelector('.intro').style.display = 'none'

      document.getElementById('init').style.display = 'block'

      document.getElementById('gameO').style.display = 'block'
      this.gameOverSound = new Audio()
      this.gameOverSound.src = "sounds/gameover.wav"
      this.gameOverSound.play();
      this.stop()
    }
    else if (this.enemy.hp <= 0) {
      document.getElementById('canvas').style.display = 'none'
      document.querySelector('.intro').style.display = 'none'
      document.getElementById('init').style.display = 'block'
      document.getElementById('youWin').style.display = 'block'
      this.gameOverSound = new Audio()
      this.gameOverSound.src = "sounds/gameover.wav"
      this.gameOverSound.play();
      this.stop()
    }

  },

  stop: function () {
    clearInterval(this.interval);

  },



  //fin del juego


  gameOver: function () {


    this.checksWinner();
    this.stop();





    // if (confirm("GAME OVER. Play again?")) {
    //   this.start();


    // }
  },


  // drawGameOverScreen: function () {

  //   fillRect(0, 0, canvas.w, canvas.h, 'black');
  //   fillText('GAME OVER', '75px Comic Sans MS', 200, 200, 'white')


  // },

  //reseteamos todos los elementos del juego para empezar en un estado limpio

  reset: function () {
    this.background = new Background(this.canvas.width, this.canvas.height, this.ctx);
    this.player = new Player(this.canvas.width, this.canvas.height, this.ctx, this);
    this.enemy = new Enemy(this.canvas.width, this.canvas.height, this.ctx, this);
    this.scoreBoard = new ScoreBoard(this);
    this.framesCounter = 0;
    this.player.bullets = [];
    this.score = 60;
    this.setListeners();
    this.checksWinner();
  },

  setListeners: function () {
    document.onkeydown = event => {
      //console.log(event.keyCode)
      // console.log(this.player.w, this.enemy.x)
      if (event.keyCode === this.keys.JUMP_P1 && this.player.y == this.player.y0) {
        //console.log("Entro")
        this.player.y -= 5;
        this.player.vy -= 10;
      }
      else if (event.keyCode === this.keys.SHOOT_P1) {
        //console.log("Entro")
        this.player.shoot();
        this.player.attack("throw")
      }
      else if (event.keyCode === this.keys.RIGHT_P1 && this.player.x + this.player.w < this.enemy.x) {
        this.player.moveRight();
      }
      else if (event.keyCode === this.keys.LEFT_P1) {
        this.player.moveLeft();
      }
      else if (event.keyCode === this.keys.PUNCH_P1) {
        this.player.attack("punch")

        //console.log("Hola");
      }
      else if (event.keyCode === this.keys.KICK_P1) {
        this.player.attack("kick")
        console.log("Hola");
      }
      //enemy keys

      else if (event.keyCode === this.keys.JUMP_P2 && this.enemy.y == this.enemy.y0) {
        console.log("Entro")
        this.enemy.y -= 5;
        this.enemy.vy -= 10;
      }
      else if (event.keyCode === this.keys.SHOOT_P2) {
        console.log("Entro")
        this.enemy.shoot();
      }
      else if (event.keyCode === this.keys.RIGHT_P2) {
        this.enemy.moveRight();
      }
      else if (event.keyCode === this.keys.LEFT_P2 && this.enemy.x > this.player.x + this.player.w) {
        this.enemy.moveLeft();
      }
      else if (event.keyCode === this.keys.KICK_P2) {
        this.enemy.attack("kick");
      }
      else if (event.keyCode === this.keys.PUNCH_P2) {
        this.enemy.attack("punch")
      }
    }
  },


  //chequea si ha sucedido una colisión
  isCollision: function () {
    // colisiones genéricas
    // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
    // esto chequea que el personaje no estén en colisión con cualquier obstáculo
    let index
    let index1

    if (this.player.bullets.some((bullet, idx) => {
      index = idx
      // console.log(bullet.x, bullet.w)
      // console.log(this.enemy.x)
      return (
        // this.player.x + this.player.w >= obstacle.x &&
        // this.player.x < obstacle.x + obstacle.w &&
        // this.player.y + (this.player.h - 20) >= obstacle.y
        bullet.x + bullet.w >= this.enemy.x
      )
    })) {
      this.enemy.hp -= 25
      this.player.bullets.splice(index, 1)
    }

    if (this.enemy.bullets.some((bullet, idx1) => {
      index1 = idx1

      return (

        bullet.x - bullet.w <= this.player.x
      )
    })) {
      this.player.hp -= 25
      this.enemy.bullets.splice(index, 1)
    }

  },


  //esto elimina los obstáculos del array que estén fuera de la pantalla
  // clearObstacles: function () {
  //   this.obstacles = this.obstacles.filter(function (obstacle) {
  //     return obstacle.x >= 0;
  //   });
  // // },
  // clearBullets: function () {
  //   this.bullets = this.bullets.filter(function (bullet) {
  //     return bullet.x < this.enemy.x;
  //   });
  // },

  //generamos nuevos obstáculos
  // generateObstacle: function () {
  //   this.obstacles.push(
  //     new Obstacle(this.canvas.width, this.player.y0, this.player.h, this.ctx)
  //   );
  // },
  //limpieza de la pantalla
  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  //dibuja todos los assets del juego
  drawAll: function () {
    this.background.draw();
    this.player.draw(this.framesCounter);
    this.enemy.draw(this.framesCounter);
    // this.obstacles.forEach(function (obstacle) {
    //   obstacle.draw();
    // });
    this.drawScore();
  },
  //mueve todos los objetos del escenario, el fondo, el jugador y los obstáculos
  moveAll: function () {
    this.background.move();
    this.player.move();
    this.enemy.move();
    // this.obstacles.forEach(function (obstacle) {
    //   obstacle.move();
    // });
  },
  //pinta el marcador
  drawScore: function () {
    this.scoreBoard.update(this.score);
  }
}
