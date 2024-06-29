// game.js
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let winner = '';

function handleCellClick(index) {
  if (gameBoard[index] === '' && !gameOver) {
    gameBoard[index] = currentPlayer;
    document.querySelectorAll('.cell')[index].textContent = currentPlayer;
    checkWin();
    togglePlayer();
  }
}

function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  document.getElementById('message').textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
      winner = gameBoard[a];
      document.getElementById('message').textContent = `Player ${winner} wins!`;
      gameOver = true;
      displayWinner();
      return;
    }
  }

  if (!gameBoard.includes('')) {
    document.getElementById('message').textContent = "It's a tie!";
    gameOver = true;
  }
}
function displayWinner() {
    const winnerMessage = `Player ${winner} has won the game!`;
    const winnerPage = `
      <html>
        <head>
          <title>Tic Tac Toe Winner</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            h1 {
              font-size: 36px;
              color: #333;
            }
          </style>
        </head>
        <body>
          <h1>${winnerMessage}</h1>
        </body>
      </html>
    `;
    const winnerWindow = window.open('', '_blank');
    winnerWindow.document.write(winnerPage);
    winnerWindow.document.close();
  }

function resetGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;
  winner = '';
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
  document.getElementById('message').textContent = "Player X's turn";
}