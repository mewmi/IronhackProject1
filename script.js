const startScreenElement = document.getElementById("start-screen");
const gameScreenElement = document.getElementById("game-screen");
const gameOverElement = document.getElementById("game-over");

const startButton = startScreenElement.querySelector("button");
const playAgainButton = gameOverElement.querySelector("button");

const game = new Game(gameScreenElement, gameOverElement);

startButton.addEventListener("click", () => {
  game.start();

  startScreenElement.style.display = "none";
  gameScreenElement.style.display = "";
});

playAgainButton.addEventListener("click", () => {
  game.start();

  gameOverElement.style.display = "none";
  gameScreenElement.style.display = "";
});
