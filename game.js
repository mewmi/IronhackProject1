class Game {
  constructor(gameScreenElement, gameOverElement, scoreElement) {
    this.gameScreenElement = gameScreenElement;
    this.gameOverElement = gameOverElement;
    this.scoreElement = scoreElement;

    this.canvasElement = document.querySelector("canvas");
    this.context = this.canvasElement.getContext("2d");

    this.enableControls();

    this.isRunning = false;

    this.reset();
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
        case "ArrowUp":
          this.player.y -= 9;
          break;
        case "ArrowDown":
          this.player.y += 9;
          break;
        case "ArrowRight":
          this.player.x += 9;
          break;
        case "ArrowLeft":
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
    if (Math.random() < 0.008) {
      this.enemies.push(new Enemy(this));
    }
  }
  possiblyAddGold() {
    if (Math.random() < 0.008) {
      this.gold.push(new Gold(this));
    }
  }
  reset() {
    this.player = new Player(this);
    this.enemies = [new Enemy(this)];
    this.gold = [new Gold(this), new Gold(this)];
    this.bombs = [];

    this.money = 75;
    this.score = 20;
    this.time = 0;

    this.frame = 0;
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
    if (this.score <= 0) {
      this.isRunning = false;
      this.lose();
    }
  }

  drawScore() {
    this.context.font = "24px sans-serif";
    this.context.fillStyle = "black";
    this.context.fillText(this.score, 80, 30);
  }
  drawMoney() {
    this.context.font = "24px sans-serif";
    this.context.fillStyle = "yellow";
    this.context.fillText(this.money, 180, 30);
  }

  drawTime() {
    this.context.font = "24px sans-serif";
    this.context.fillStyle = "black";
    this.context.fillText(this.time, 290, 30);
  }
  drawText() {
    this.context.fillText("Health:", 1, 30);
    this.context.fillText("Gold:", 120, 30);
    this.context.fillText("Score:", 220, 30);
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
    this.drawTime();
    this.drawText();
  }
  lose() {
    this.gameScreenElement.style.display = "none";
    this.gameOverElement.style.display = "";
    clearInterval(this.intervalId);
  }

  start() {
    this.isRunning = true;
    this.loop();
    this.reset();
  }

  loop() {
    this.intervalId = setInterval(() => {
      if (this.isRunning) {
        this.runLogic();
        this.draw();
        this.time += 1;
      }
    }, 1000 / 60);
  }
}
