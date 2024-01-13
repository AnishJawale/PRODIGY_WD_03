let currentPlayer = "X";
let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
let gameOver = false;

function playerMove(row, col) {
    if (!gameOver && board[row][col] === "") {
        board[row][col] = currentPlayer;
        document.getElementById(`box${row}${col}`).innerText = currentPlayer;
        checkWinner();
        switchPlayer();

        if (!gameOver) {
            setTimeout(() => {
                computerMove();
            }, 500);
        }
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateTurn();
}

function updateTurn() {
    document.querySelector(".turn-box").innerText = currentPlayer;
}

function computerMove() {
    const emptyCells = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === "") {
                emptyCells.push({ row: i, col: j });
            }
        }
    }

    // Check for a winning move
    for (let i = 0; i < emptyCells.length; i++) {
        const cell = emptyCells[i];
        board[cell.row][cell.col] = currentPlayer;
        if (checkWinCondition(currentPlayer)) {
            document.getElementById(`box${cell.row}${cell.col}`).innerText = currentPlayer;
            checkWinner();
            switchPlayer();
            return;
        }
        board[cell.row][cell.col] = ""; // Undo the move
    }

    // Check for a blocking move
    for (let i = 0; i < emptyCells.length; i++) {
        const cell = emptyCells[i];
        board[cell.row][cell.col] = "X"; // Assume player's move
        if (checkWinCondition("X")) {
            board[cell.row][cell.col] = currentPlayer;
            document.getElementById(`box${cell.row}${cell.col}`).innerText = currentPlayer;
            checkWinner();
            switchPlayer();
            return;
        }
        board[cell.row][cell.col] = ""; // Undo the move
    }

    // If no winning or blocking move, make a random move
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomCell = emptyCells[randomIndex];
    board[randomCell.row][randomCell.col] = currentPlayer;
    document.getElementById(`box${randomCell.row}${randomCell.col}`).innerText = currentPlayer;
    checkWinner();
    switchPlayer();
}

function checkWinner() {
    if (checkWinCondition("X")) {
        endGame("X");
    } else if (checkWinCondition("O")) {
        endGame("O");
    } else if (isBoardFull()) {
        endGame("Tie");
    }
}

function checkWinCondition(player) {
    for (let i = 0; i < 3; i++) {
        if (
            (board[i][0] === player && board[i][1] === player && board[i][2] === player) ||
            (board[0][i] === player && board[1][i] === player && board[2][i] === player) ||
            (board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
            (board[0][2] === player && board[1][1] === player && board[2][0] === player)
        ) {
            return true;
        }
    }
    return false;
}

function isBoardFull() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === "") {
                return false;
            }
        }
    }
    return true;
}

function endGame(winner) {
    gameOver = true;
    document.querySelector("h3").innerText = winner === "Tie" ? "It's a Tie!" : `${winner} Wins!`;
    document.getElementById("play-again").style.display = "block";
}

function resetGame() {
    currentPlayer = "X";
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    gameOver = false;

    document.querySelectorAll(".box").forEach((box) => {
        box.innerText = "";
    });

    document.querySelector("h3").innerText = "Player's Turn";
    document.getElementById("play-again").style.display = "none";
    updateTurn();
}
