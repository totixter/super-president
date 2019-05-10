//caracter principal del juego
class Player {
  constructor(w, h, ctx, game) {

    this.game = game
    this.canvasW = w;
    this.canvasH = h;
    this.ctx = ctx;
    //this.keys = keys;
    this.x = this.canvasW * 0.09;

    // guardar posición original (suelo)
    this.y0 = this.canvasH * 0.45;
    this.y = this.y0;

    this.img = new Image();
    this.img.src = "img/abascal-idle.png";

    // número de imágenes diferentes
    this.img.frames = 3;
    this.img.frameIndex = 0;

    // medidas de la imagen a representar en el canvas
    this.w = 200;
    this.h = 420;

    this.vy = 20;
    this.vx = 80;

    this.bullets = [];

    this.hp = 200
    this.maxShots = 4

    // this.attackSound = new Audio()
    // this.attackSound.src = ""


  }

  draw(framesCounter) {
    // Documentación drawImage:
    // https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D/drawImage
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
      0,
      Math.floor(this.img.width / this.img.frames),
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    );

    this.animateImg(framesCounter);



    this.bullets = this.bullets.filter(bullet => {
      return bullet.x < this.canvasW;
    });

    this.bullets.forEach(function (bullet) {
      bullet.drawRight();
      bullet.moveRight();
    });
  }

  shoot() {


    if (this.maxShots > 0) {
      var bullet = new Bullet(
        this.x + this.w,
        this.y + this.h / 4,
        this.y0,
        this.h,
        this.ctx
      );
      this.bullets.push(bullet);
    }

    this.maxShots--


  }


  attack(type) {

    // this.attackSound.play()
    //let attack = new Attack()
    if (type === "punch") {
      this.img.src = "img/abascal-punch.png"
      this.img.frames = 3
      this.gamePunchSound = new Audio()
      this.gamePunchSound.src = "sounds/punch.wav"
      this.gamePunchSound.play();
      //console.log(this.x - this.game.enemy.x)
      let distance = this.x - this.game.enemy.x
      if (distance > 0 && distance < 200 || distance > -200 && distance < 0) {
        this.game.enemy.hp -= 5
      }
    }
    else if (type === "kick") {
      this.img.src = 'img/abascal-kick2.png'
      this.img.frames = 4.8
      this.gameKickSound = new Audio()
      this.gameKickSound.src = "sounds/kick.wav"
      this.gameKickSound.play();
      let distance = this.x - this.game.enemy.x
      if (distance > 0 && distance < 200 || distance > -200 && distance < 0) {
        this.game.enemy.hp -= 10
      }
      //console.log(this.game.enemy.hp)
    }
    else if (type === "throw") {
      this.img.src = 'img/abascal-punch.png' //aqui tengo que poner el movimiento del hadoken
      this.img.frames = 3
    }

  }

  animateImg(framesCounter) {
    // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
    if (framesCounter % 7 === 0) {
      this.img.frameIndex += 1;

      // Si el frame es el último, se vuelve al primero
      if (this.img.frameIndex > this.img.frames - 1) {
        this.img.frameIndex = 0;
        this.img.src = "img/abascal-idle.png";
        this.img.frames = 3
      }

    }
  }

  move() {
    // Aumenta la velocidad en el eje y.
    var gravity = 0.17;

    // solo salta cuando el personaje está en el suelo
    if (this.y >= this.y0) {

      this.vy = 1;
      this.y = this.y0;
    } else {
      this.img.src = "img/abascal-jump.png";
      this.img.frames = 3
      this.vy += gravity;
      this.y += this.vy;
    }
  }
  moveLeft() {
    if (this.x > 0) this.x -= this.vx
  }

  moveRight() {
    if (this.x < this.canvasW - this.w) this.x += this.vx
  }

  // esto es para que cambie de facing position si enemy pasa a la izquierda y player a la derecha 
  checkPosition() {
    if (this.x > this.enemy.x) {
      this.img.src = "img/ken-shoryuken.png"
    } else {
      this.img.src = "img/ken-shoryuken-reverse.png"
    }
  }

}
