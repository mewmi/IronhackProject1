const bombImage = new Image();
bombImage.src = "img/bomb64.png";

class Bomb {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 24;
    this.height = 24;
  }

  dissapear() {
    const index = this.game.bombs.indexOf(this);
    this.game.bombs.splice(index, 1);
  }

  draw() {
    this.game.context.drawImage(
      bombImage,
      this.x,
      this.y,
      this.height,
      this.width
    );
  }
}
