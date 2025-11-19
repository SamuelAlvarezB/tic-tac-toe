function player(name, symbol) {
    let score = 0;
    return {
        name: name,
        symbol: symbol,
        hey() {
            console.log("Hey, I'm player " + name);
        },
        incrementScore() {
            score++;
            console.log("Player " + name + " score: " + score);
        }
    }
}

function game(board, players = []) {
    let player = players[0];
    let winner = "";
    let symbol = player.symbol;
    return {
        winner: winner,
        symbol: symbol,
        players: players,
        showBoard() {
            console.log(board.board);
        },
        updateBoard(pos1, pos2) {
            this.getTurn();
            if (board.board[pos1][pos2] === "") {
                board.board[pos1][pos2] = symbol;
                if (symbol === 'X') {
                    symbol = 'O';
                } else {
                    symbol = 'X';
                }
            }
            this.checkWinCondition();
            this.changePlayer();
        },
        getTurn() {
            console.log("Actual turn: " + player.name + "(" + symbol + ")");
        },
        changePlayer() {
            if (player === players[0]) {
                player = players[1];
            } else {
                player = players[0];
            }
        },
        checkWinCondition() {
            let row1Check = [board.board[0][0], board.board[0][1], board.board[0][2]];
            let row2Check = [board.board[1][0], board.board[1][1], board.board[1][2]];
            let row3Check = [board.board[2][0], board.board[2][1], board.board[2][2]];
            let col1Check = [board.board[0][0], board.board[1][0], board.board[2][0]];
            let col2Check = [board.board[0][1], board.board[1][1], board.board[2][1]];
            let col3Check = [board.board[0][2], board.board[1][2], board.board[2][2]];
            if (row1Check[0] === row1Check[1] && row1Check[1] === row1Check[2] && row1Check[0] != "" && row1Check[1] != "" && row1Check[2] != "") {
                winner = player.name;
                this.finishGame();
            } else if (row2Check[0] === row2Check[1] && row2Check[1] === row2Check[2] && row2Check[0] != "" && row2Check[1] != "" && row2Check[2] != "") {
                winner = player.name;
                this.finishGame();
            } else if (row3Check[0] === row3Check[1] && row3Check[1] === row3Check[2] && row3Check[0] != "" && row3Check[1] != "" && row3Check[2] != "") {
                winner = player.name;
                this.finishGame();
            } else if (col1Check[0] === col1Check[1] && col1Check[1] === col1Check[2] && col1Check[0] != "" && col1Check[1] != "" && col1Check[2] != "") {
                winner = player.name;
                this.finishGame();
            } else if (col2Check[0] === col2Check[1] && col2Check[1] === col2Check[2] && col2Check[0] != "" && col2Check[1] != "" && col2Check[2] != "") {
                winner = player.name;
                this.finishGame();
            } else if (col3Check[0] === col3Check[1] && col3Check[1] === col3Check[2] && col3Check[0] != "" && col3Check[1] != "" && col3Check[2] != "") {
                winner = player.name;
                this.finishGame();
            }
        },
        finishGame() {
            console.log("GAME FINISHED. WINNER IS: " + winner + "(" + player.symbol + ")");
        }
    }
}

let newBoard = (function () {
    let board = [["", "", ""], ["", "", ""], ["", "", ""]];
    return {
        board: board,
    };
})();

let players = (function () {
    let player1 = player("Player 1", "X");
    player1.hey();
    player1.incrementScore();
    let player2 = player("Player 2", "O");
    player2.hey();
    player2.incrementScore();
    return [player1, player2];
})();

let newGame = (function () {
    let createGame = game(newBoard, players);
    return createGame;

})();

newGame.showBoard();
newGame.updateBoard(0, 1);
newGame.updateBoard(1, 1);
newGame.updateBoard(0, 2);
newGame.updateBoard(0, 0);
newGame.updateBoard(1, 2);
newGame.updateBoard(1, 0);
newGame.updateBoard(2, 2);
