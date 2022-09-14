class Player {
  constructor(game) {
    this.game = game;
    this.x = 200;
    this.y = 300;
    this.width = 20;
    this.height = 30;
  }
  draw() {
    this.game.context.fillStyle = "green";
    this.game.context.fillRect(this.x, this.y, this.width, this.height);
  }
}
