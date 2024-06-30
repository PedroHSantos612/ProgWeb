(function () {
  let FPS = 10;
  const SIZE = 40;
  let gameInterval;
  let isRunning = false;
  let frames = 0;

  let board;
  let snake;
  let food;
  let score = 0;

  function init() {
    board = new Board(SIZE);
    snake = new Snake([[4, 4], [4, 5], [4, 6]]);
    food = new Food();
    food.placeRandom();
    frames++;
    if (frames % 60 === 0) {
      FPS++;
      clearInterval(gameInterval);
      gameInterval = setInterval(run, 1000 / FPS);
      document.getElementById("score").innerText
    }
    updateScore();
  }

  function startGame() {
    if (!isRunning) {
      gameInterval = setInterval(run, 1000 / FPS);
      isRunning = true;
    }
  }

  function pauseGame() {
    if (isRunning) {
      clearInterval(gameInterval);
      isRunning = false;
    }
  }

  function resetGame() {
    clearInterval(gameInterval);
    document.body.innerHTML = "";
    FPS = 10;
    score = 0;
    frames = 0;
    isRunning = false;
    init();
  }

  function toggleGame() {
    if (isRunning) {
      pauseGame();
    } else {
      startGame();
    }
  }

  function updateScore() {
    document.getElementById("score").innerText = score.toString().padStart(5, '0');
  }

  function showGameOver() {
    const gameOverMessage = document.createElement("div");
    gameOverMessage.setAttribute("id", "game-over");
    gameOverMessage.innerText = "Fim de Jogo!";
    document.body.appendChild(gameOverMessage);
  }

  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        snake.changeDirection(0);
        break;
      case "ArrowRight":
        snake.changeDirection(1);
        break;
      case "ArrowDown":
        snake.changeDirection(2);
        break;
      case "ArrowLeft":
        snake.changeDirection(3);
        break;
      case "p":
        toggleGame();
        break;
      case "s":
        if (!isRunning) 
          resetGame()
          toggleGame();
        break;
      default:
        break;
    }
  });

  class Board {
    constructor(size) {
      this.element = document.createElement("table");
      this.element.setAttribute("id", "board");
      this.color = "#ccc";
      document.body.appendChild(this.element);
      for (let i = 0; i < size; i++) {
        const row = document.createElement("tr");
        this.element.appendChild(row);
        for (let j = 0; j < size; j++) {
          const field = document.createElement("td");
          row.appendChild(field);
        }
      }
      this.createScoreBoard();
    }

    createScoreBoard() {
      const scoreBoard = document.createElement("div");
      scoreBoard.setAttribute("id", "scoreBoard");
      const scoreValue = document.createElement("span");
      scoreValue.setAttribute("id", "score");
      scoreValue.innerText = "0000";
      scoreBoard.appendChild(scoreValue);
      document.body.insertBefore(scoreBoard, this.element);
    }
  }

  class Snake {
    constructor(body) {
      this.body = body;
      this.color = "#222";
      this.direction = 1; // 0 para cima, 1 para direita, 2 para baixo, 3 para esquerda
      this.nextDirection = this.direction;
      this.body.forEach(field => this.setColor(field[0], field[1], this.color));
    }

    walk() {
      this.direction = this.nextDirection;
      const head = this.body[this.body.length - 1];
      let newHead;
      switch (this.direction) {
        case 0:
          newHead = [head[0] - 1, head[1]];
          break;
        case 1:
          newHead = [head[0], head[1] + 1];
          break;
        case 2:
          newHead = [head[0] + 1, head[1]];
          break;
        case 3:
          newHead = [head[0], head[1] - 1];
          break;
        default:
          break;
      }

      if (this.checkCollision(newHead)) {
        pauseGame();
        showGameOver();
        return;
      }

      this.body.push(newHead);
      this.setColor(newHead[0], newHead[1], this.color);

      if (newHead[0] === food.position[0] && newHead[1] === food.position[1]) {
        score += food.type === "black" ? 1 : 2; // Incrementa a pontuação
        updateScore(); // Atualiza o quadro de pontuação
        food.placeRandom(); // Reposiciona a comida
      } else {
        const oldTail = this.body.shift();
        this.setColor(oldTail[0], oldTail[1], board.color);
      }
    }

    changeDirection(direction) {
      if ((this.direction % 2) !== (direction % 2)) {
        this.nextDirection = direction;
      }
    }

    checkCollision(newHead) {
      const [row, col] = newHead;
      return (
        row < 0 || col < 0 || row >= SIZE || col >= SIZE || 
        this.body.some(segment => segment[0] === row && segment[1] === col)
      );
    }

    setColor(row, col, color) {
      document.querySelector(`#board tr:nth-child(${row + 1}) td:nth-child(${col + 1})`).style.backgroundColor = color;
    }
  }

  class Food {
    constructor() {
      this.position = [0, 0];
      this.type = "black"; // Tipo padrão é preto
    }

    placeRandom() {
      const randomPosition = () => Math.floor(Math.random() * SIZE);
      let newPosition;
      do {
        newPosition = [randomPosition(), randomPosition()];
      } while (snake.body.some(segment => segment[0] === newPosition[0] && segment[1] === newPosition[1]));

      this.position = newPosition;
      this.type = Math.random() < 0.666 ? "black" : "red"; // 2/3 de chance para preto, 1/3 para vermelho
      this.setColor(this.position[0], this.position[1], this.type === "black" ? "#000" : "#f00");
    }

    setColor(row, col, color) {
      document.querySelector(`#board tr:nth-child(${row + 1}) td:nth-child(${col + 1})`).style.backgroundColor = color;
    }
  }

  function run() {
    snake.walk();
  }

  init();
})();
