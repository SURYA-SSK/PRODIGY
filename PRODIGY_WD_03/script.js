let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let mode = "player"; // Default mode

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function setMode(selectedMode) {
    mode = selectedMode;
    resetGame();
}

function handleClick(index) {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    updateBoard();
    checkWinner();

    if (gameActive && mode === "ai" && currentPlayer === "O") {
        setTimeout(aiMove, 500);
    }
}

function updateBoard() {
    document.querySelectorAll(".cell").forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            document.getElementById("status").textContent = `${board[a]} Wins!`;
            return;
        }
    }

    if (!board.includes("")) {
        gameActive = false;
        document.getElementById("status").textContent = "It's a Draw!";
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        document.getElementById("status").textContent = `Player ${currentPlayer}'s turn`;
    }
}

function aiMove() {
    let emptyCells = board.map((val, index) => (val === "" ? index : null)).filter(v => v !== null);
    if (emptyCells.length > 0) {
        let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomIndex] = "O";
        updateBoard();
        checkWinner();
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    updateBoard();
    document.getElementById("status").textContent = "Player X's turn";
}
