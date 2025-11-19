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
    let active = true;
    return {
        winner: winner,
        symbol: symbol,
        players: players,
        player: player,
        board: board,
        active: active,
        showBoard() {
            console.log(board.board);
        },
        updateBoard(pos1, pos2) {
            this.getTurn();
            if (board.board[pos1][pos2] === "") {
                board.board[pos1][pos2] = player.symbol;
                this.checkWinCondition();
                this.changePlayer();
            }
        },
        getTurn() {
            let turnDiv = document.getElementById("turn");
            if (this.active) {
                turnDiv.innerText = "Actual turn: " + player.name + "(" + player.symbol + ")";
            } else {
                turnDiv.innerText = "Game Finished"
            }
        },
        changePlayer() {
            if (player.symbol === "X") {
                player = players[1];
            } else if (player.symbol === "O") {
                player = players[0];
            }
            this.getTurn();
        },
        checkWinCondition() {
            let row1Check = [board.board[0][0], board.board[0][1], board.board[0][2]];
            let row2Check = [board.board[1][0], board.board[1][1], board.board[1][2]];
            let row3Check = [board.board[2][0], board.board[2][1], board.board[2][2]];
            let col1Check = [board.board[0][0], board.board[1][0], board.board[2][0]];
            let col2Check = [board.board[0][1], board.board[1][1], board.board[2][1]];
            let col3Check = [board.board[0][2], board.board[1][2], board.board[2][2]];
            let diag1Check = [board.board[0][0], board.board[1][1], board.board[2][2]];
            let diag2Check = [board.board[0][2], board.board[1][1], board.board[2][0]];
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
            } else if (diag1Check[0] === diag1Check[1] && diag1Check[1] === diag1Check[2] && diag1Check[0] != "" && diag1Check[1] != "" && diag1Check[2] != "") {
                winner = player.name;
                this.finishGame();
            } else if (diag2Check[0] === diag2Check[1] && diag2Check[1] === diag2Check[2] && diag2Check[0] != "" && diag2Check[1] != "" && diag2Check[2] != "") {
                winner = player.name;
                this.finishGame();
            }
        },
        finishGame() {
            this.active = false;
            this.getTurn();
            console.log("GAME FINISHED. WINNER IS: " + winner + "(" + player.symbol + ")");
            const resetDiv = document.getElementById("reset");
            console.log(resetDiv);
            const winAnnounce = document.createElement("p");
            winAnnounce.classList.add("win-announce");
            winAnnounce.innerText = "The winner is: " + winner;
            const confirmReset = document.createElement("p");
            confirmReset.classList.add("confirm-reset");
            confirmReset.innerText = "Do you want to restart the game?";
            const resetButton = document.createElement("button");
            resetButton.id = "resetButton";
            resetButton.innerText = "RESET GAME";
            resetButton.addEventListener('click', (e) => {
                this.resetGame();
            })
            resetDiv.append(winAnnounce, confirmReset, resetButton);
        },
        deactiveBoard() {
            if (active === false) {
                console.log("DEACTIVATED")
                let buttonArray = document.getElementsByClassName("gameCell");
                for (const button of buttonArray) {
                    button.disabled = true;
                }
            } else {
                button.disabled = false;
            }
        },
        resetGame() {
            window.location.reload();
        }
    }
}

function displayBoard(game) {
    return {
        game: game,
        createDisplay() {
            const gameDiv = document.getElementById("game-board");
            console.log(game.board.board);
            for (let i = 0; i < game.board.board.length; i++) {
                for (let j = 0; j < game.board.board[i].length; j++) {
                    let newCell = document.createElement("button");
                    newCell.innerHTML = game.board.board[i][j];
                    newCell.classList.add("gameCell");
                    newCell.classList.add(i + "-" + j);
                    gameDiv.appendChild(newCell);
                }
            }
            this.addListener();

        },
        addListener() {
            let buttonArray = document.getElementsByClassName("gameCell");
            for (const button of buttonArray) {
                button.addEventListener('click', (e) => {
                    if (game.active) {
                        let splitArray = e.target.classList.item(1).split("-");
                        let pos1 = splitArray[0];
                        let pos2 = splitArray[1];
                        game.updateBoard(pos1, pos2);
                        e.target.innerText = game.board.board[pos1][pos2];
                        if (game.board.board[pos1][pos2] === 'X') {
                            e.target.style.color = "red";
                        } else {
                            e.target.style.color = "blue";
                        }
                    }
                })
            }
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
    createGame.getTurn();
    return createGame;

})();


displayBoard(newGame).createDisplay();
