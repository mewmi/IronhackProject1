const enemyRunImage = new Image();
enemyRunImage.src = "img/DinoSprites - mort.png";

class Enemy {
  constructor(game) {
    this.game = game;
    this.x = -44;
    this.y = 595;
    this.width = 36;
    this.height = 36;
    this.direction = "right";
  }
  checkInter(item) {
    return (
      this.x + this.width > item.x &&
      this.x < item.x + item.width &&
      this.y + this.height > item.y &&
      this.y < item.y + item.height
    );
  }

  dissapear() {
    const index = this.game.enemies.indexOf(this);
    this.game.enemies.splice(index, 1);
  }
  runLogic() {
    this.direction = "right";

    if (this.direction === "right") {
      this.x += 1;
    }

    if (this.direction === "left") {
      this.x -= 1;
    }

    if (this.direction === "up") {
      this.y -= 1;
    }

    if (this.direction === "down") {
      this.y += 1;
    }

    const isIntWithPlayer = this.checkInter(this.game.player);
    if (isIntWithPlayer) {
      this.game.score -= 1;
      this.dissapear();
    }
    if (this.game.bombs.length > 0) {
      for (const bomb of this.game.bombs) {
        const isIntBomb = this.checkInter(bomb);
        if (isIntBomb) {
          bomb.dissapear();
          this.dissapear();
          console.log(bomb);
          // this.game.isRunning = false;
        }
      }
    }
  }
  draw() {
    this.game.context.drawImage(
      enemyRunImage,
      24 * (Math.floor(this.game.frame / 3) % 6),
      0,
      24,
      24,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
