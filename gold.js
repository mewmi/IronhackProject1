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
      this.game.money += 5;
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
    this.game.context.fillStyle = "yellow";
    this.game.context.fillRect(this.x, this.y, this.width, this.height);
  }
}
