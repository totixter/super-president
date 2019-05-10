//clase bala. Contiene los principios de la learning de velocidad y aceleración de la learning de animaciones avanzadas
class Bullet {
  constructor(x, y, y0, h, ctx) {
    this.x = x;
    this.y = y;
    this.y0 = y0
    this.h = h
    this.ctx = ctx
    this.r = 15;
    this.vx = 15;
    this.vy = 1;
    this.w = 180

    this.gravity = 0.35;
    this.image = new Image();
    this.image.src = 'img/airplane-vector.png';

    this.imageR = new Image();
    this.imageR.src = 'img/casado-attack-icon.png';
  }

  drawRight() {
    this.ctx.drawImage(this.image, this.x, this.y, this.w * 1.5, 100)

    // this.ctx.beginPath();
    // this.ctx.fillStyle = '#B8860B';
    // this.ctx.arc(this.x, this.y, this.r * 2, 0, Math.PI * 2);
    // this.ctx.fill();
    // this.ctx.closePath();
  }

  drawLeft() {

    this.ctx.drawImage(this.imageR, this.x, this.y, this.w * 1.2, 300)
    // this.ctx.beginPath();
    // this.ctx.fillStyle = 'pink';
    // this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    // this.ctx.fill();
    // this.ctx.closePath();
  }

  moveRight() {
    this.x += this.vx;

    // this.vy += this.gravity;
    // this.y += this.vy;

    if (this.y > this.y0 + this.h) {
      this.vy *= -1;
    }
  }

  moveLeft() {
    this.x -= this.vx * 0.8;

    // this.vy += this.gravity * 3;
    // this.y += this.vy;

    if (this.y > this.y0 + this.h) {
      this.vy *= -1.35;
    }
  }
}
