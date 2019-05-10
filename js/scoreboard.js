//este literal mantiene el marcador del juego con su puntuación
class ScoreBoard {

  constructor(game) {
    this.game = game,
      this.ctx = this.game.ctx
    this.player = this.game.player
    this.enemy = this.game.enemy
    this.ctx.font = "30px sans-serif";
    this.score = this.game.score
  }

  update() {

    this.ctx.fillStyle = "red";
    this.ctx.fillRect(50, 50, this.player.hp * 3.25, 30)

    this.ctx.fillStyle = "green";
    this.ctx.fillRect(50, 40, 650, 10)

    this.ctx.fillStyle = "green";
    this.ctx.fillRect(50, 80, 650, 10)

    this.ctx.fillStyle = "green";
    this.ctx.fillRect(40, 50, 10, 30)

    this.ctx.fillStyle = "green";
    this.ctx.fillRect(700, 50, 10, 30)

    this.ctx.fillStyle = "blue";
    this.ctx.fillText("LIFE!!", 325, 75)

    this.ctx.fillStyle = "red";
    this.ctx.fillRect(950, 50, this.enemy.hp * 3.25, 30)

    this.ctx.fillStyle = "green";
    this.ctx.fillRect(950, 40, 650, 10)

    this.ctx.fillStyle = "green";
    this.ctx.fillRect(950, 80, 650, 10)

    this.ctx.fillStyle = "green";
    this.ctx.fillRect(940, 50, 10, 30)

    this.ctx.fillStyle = "green";
    this.ctx.fillRect(1600, 50, 10, 30)

    this.ctx.fillStyle = "blue";
    this.ctx.fillText("LIFE!!", 1250, 75)

    this.ctx.fillStyle = "#C49517";
    this.ctx.fillText("DEMO VERSION", 710, 125)

    this.ctx.fillStyle = "black";
    this.ctx.fillText(Math.floor(this.game.score), 800, 75)


    //this.ctx.fillText(Math.floor(score), 50, 50);
  }
};
