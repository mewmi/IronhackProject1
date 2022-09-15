class Game {
  constructor() {
    this.canvasElement = document.querySelector("canvas");
    this.context = this.canvasElement.getContext("2d");

    this.player = new Player(this);
    this.enemies = [new Enemy(this)];
    this.gold = [new Gold(this), new Gold(this)];
    this.bombs = [];
    this.enableControls();

    this.money = 5;
    this.score = 0;
    console.log(this.score);
    console.log(this.money);
    this.isRunning = false;

    this.frame = 0;
  }

  enableControls() {
    window.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "KeyW":
          this.player.y -= 5;
          break;
        case "KeyS":
          this.player.y += 5;
          break;
        case "KeyD":
          this.player.x += 5;
          break;
        case "KeyA":
          this.player.x -= 5;
          break;
        case "Space":
          this.placeBomb();
          this.money -= 10;
          break;
      }
    });
  }

  placeBomb() {
    const bomb = new Bomb(this, this.player.x, this.player.y);
    this.bombs.push(bomb);
  }

  possiblyAddEnemy() {
    if (Math.random() < 0.01) {
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
