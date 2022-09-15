const playerRunImage = new Image();
playerRunImage.src = "img/Owlet_Monster_Run_6.png";

class Player {
  constructor(game) {
    this.game = game;
    this.x = 600;
    this.y = 120;
    this.width = 32;
    this.height = 32;
  }
  draw() {
    this.game.context.drawImage(
      playerRunImage,
      32 * (Math.floor(this.game.frame / 3) % 6),
      0,
      32,
      32,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
