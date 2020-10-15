const board = document.getElementById("board");
const cells = document.querySelectorAll("[data-cell]");
const winningMessageBox = document.getElementById("winning-message");
const gameOverText = document.querySelector("[data-game-over-text]");
const restartBtn = document.getElementById("restart-btn");
const turnText = document.getElementById("turns-box");
const xClass = "x";
const circleClass = "circle";
let circleTurn;

const WINNING_COMBINATIONS = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
];
startGame();

function startGame() {
   turnSelector();
   cells.forEach((cell) => {
      cell.classList.remove(xClass);
      cell.classList.remove(circleClass);
      cell.removeEventListener("click", onClick);
      cell.addEventListener("click", onClick, { once: true });
   });
   setBoardHoverClass();
   winningMessageBox.classList.remove("show");
}

restartBtn.addEventListener("click", startGame);

function endGame(win) {
   if (win) {
      gameOverText.textContent = `${circleTurn ? "O" : "X"} Wins!`;
   } else {
      gameOverText.textContent = "It's a draw";
   }
   winningMessageBox.classList.add("show");
}

function onClick(event) {
   //check turn
   //place mark
   //swap turn
   //check win
   //check draw
   displayTurnText();
   const cellClicked = event.target;
   const currentClass = circleTurn ? circleClass : xClass;
   placeMark(cellClicked, currentClass);
   if (checkWin(currentClass)) {
      endGame(true);
   } else if (isDraw()) {
      endGame(false);
   } else {
      swapTurn();
      setBoardHoverClass();
   }
}

function turnSelector() {
   const num = Math.round(Math.random());
   if (num) {
      circleTurn = true;
      turnText.innerHTML = "O's Turn";
   } else {
      circleTurn = false;
      turnText.innerHTML = "X's turn";
   }
}

function placeMark(cell, currentClass) {
   cell.classList.add(currentClass);
}

function displayTurnText() {
   if (circleTurn) {
      turnText.textContent = "X's turn";
   } else {
      turnText.textContent = "O's turn";
   }
}

function swapTurn() {
   circleTurn = !circleTurn;
}

function checkWin(currentClass) {
   return WINNING_COMBINATIONS.some((combination) => {
      return combination.every((index) => {
         return cells[index].classList.contains(currentClass);
      });
   });
}

function isDraw() {
   return [...cells].every((cell) => {
      return (
         cell.classList.contains(xClass) || cell.classList.contains(circleClass)
      );
   });
}

function setBoardHoverClass() {
   board.classList.remove(xClass);
   board.classList.remove(circleClass);
   if (circleTurn) {
      board.classList.add(circleClass);
   } else {
      board.classList.add(xClass);
   }
}
