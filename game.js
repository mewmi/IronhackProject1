class Game {
  constructor() {
    this.canvasElement = document.querySelector("canvas");
    this.context = this.canvasElement.getContext("2d");

    this.player = new Player(this);
    this.enemies = [new Enemy(this)];
    this.gold = [new Gold(this), new Gold(this)];
    this.bombs = [];
    this.enableControls();

    this.money = 75;
    this.score = 20;

    this.isRunning = false;
    this.frame = 0;
  }

  enableControls() {
    window.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "KeyW":
          this.player.y -= 9;
          break;
        case "KeyS":
          this.player.y += 9;
          break;
        case "KeyD":
          this.player.x += 9;
          break;
        case "KeyA":
          this.player.x -= 9;
          break;
        case "Space":
          this.placeBomb();
          break;
      }
    });
  }

  placeBomb() {
    if (this.money >= 10) {
      const bomb = new Bomb(
        this,
        this.player.x,
        this.player.y + this.player.height / 2
      );
      this.bombs.push(bomb);
      this.money -= 10;
    }
  }

  possiblyAddEnemy() {
    if (Math.random() < 0.007) {
      this.enemies.push(new Enemy(this));
    }
  }
  possiblyAddGold() {
    if (Math.random() < 0.008) {
      this.gold.push(new Gold(this));
    }
  }

  runLogic() {
    this.possiblyAddEnemy();
    this.possiblyAddGold();
    for (const enemy of this.enemies) {
      enemy.runLogic();
    }
    for (const coins of this.gold) {
      coins.runLogic();
    }
  }

  drawScore() {
    this.context.font = "32px sans-serif";
    this.context.fillStyle = "black";
    this.context.fillText(this.score, 60, 30);
  }
  drawMoney() {
    this.context.font = "32px sans-serif";
    this.context.fillStyle = "yellow";
    this.context.fillText(this.money, 130, 30);
  }

  draw() {
    this.frame++;
    this.context.clearRect(0, 0, 1000, 720);
    this.player.draw();
    for (const enemy of this.enemies) {
      enemy.draw();
    }
    for (const indGold of this.gold) {
      indGold.draw();
    }
    for (const bomb of this.bombs) {
      bomb.draw();
    }
    this.drawScore();
    this.drawMoney();
  }

  start() {
    this.isRunning = true;
    this.loop();
  }

  loop() {
    setInterval(() => {
      if (this.isRunning) {
        this.runLogic();
        this.draw();
      }
    }, 1000 / 60);
  }
}
