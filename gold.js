const goldImage = new Image();
goldImage.src = "img/GoldCoinSpinning.png";

class Gold {
  constructor(game) {
    this.game = game;
    this.x = Math.random() * 1000;
    this.y = Math.random() * 720;
    this.width = 20;
    this.height = 20;
  }

  checkIntersection(item) {
    return (
      this.x + this.width > item.x &&
      this.x < item.x + item.width &&
      this.y + this.height > item.y &&
      this.y < item.y + item.height
    );
  }

  dissapear() {
    const index = this.game.gold.indexOf(this);
    this.game.gold.splice(index, 1);
  }
  runLogic() {
    const isIntPlayer = this.checkIntersection(this.game.player);
    if (isIntPlayer) {
      this.game.money += 8;
      this.dissapear();
    }
    for (const enem of this.game.enemies) {
      const isIntEnemy = this.checkIntersection(enem);
      if (isIntEnemy) {
        this.dissapear();
      }
    }
  }

  draw() {
    this.game.context.drawImage(
      goldImage,
      8 * (Math.floor(this.game.frame / 3) % 6),
      0,
      8,
      8,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
