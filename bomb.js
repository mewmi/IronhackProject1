class Bomb {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
  }

  dissapear() {
    const index = this.game.bombs.indexOf(this);
    this.game.bombs.splice(index, 1);
  }

  draw() {
    this.game.context.fillStyle = "purple";
    this.game.context.fillRect(this.x, this.y, this.width, this.height);
  }
}
