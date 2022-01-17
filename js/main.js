import Player from "./Player.js";
// Constants
const playerNameInputField = document.querySelector('.input-field-player-name');
const addPlayerButton = document.querySelector('.add-player-button');
const resetGameButton = document.querySelector('.reset-game-button');
const gameStatus = document.querySelector('.game-status');

let currentPlayer = 0;
const fields = document.querySelectorAll('.tic-tac-toe-board > .box');

// Elements of player one
const playerOneLabel = document.querySelector('.player-one-label');
const addPointsPlayerOneButton = document.querySelector('.add-points-player1-button');

// Elements of player two
const playerTwoLabel = document.querySelector('.player-two-label');
const addPointsPlayerTwoButton = document.querySelector('.add-points-player2-button');

// Array of players
let players = [];

// Starting version of the game
resetGame();

// Event listeners
if (addPlayerButton) {
    addPlayerButton.addEventListener("click", addPlayer);
}

if (resetGameButton) {
    resetGameButton.addEventListener("click", resetGame);
    resetGameButton.addEventListener("click", status);
}

if (addPointsPlayerOneButton) {
    addPointsPlayerOneButton.addEventListener("click", addPointsPlayerOne);
}

if (addPointsPlayerTwoButton) {
    addPointsPlayerTwoButton.addEventListener("click", addPointsPlayerTwo);
}

// Functions
function addPlayer() {
    if (players.length >= 2) {
        alert("There are 2 players (or more) already. Press Reset button to start a new game.");
        return;
    }

    const playerName = playerNameInputField.value;
    let symbol = "X";
    if (players.length == 1) {
        symbol = "O";
    }
    const newPlayer = new Player(playerName, symbol);
    if (playerName === "") {
        alert("You can't play without entering a name")
    }
    else {
        players.push(newPlayer);
    }
    printPlayers();
}

function printPlayers() {
    playerNameInputField.value = "";

    console.log("Print your players here");

    if (players.length == 0) {
        console.log("No one to play");
        playerOneLabel.innerHTML = "Enter player one..";
        playerTwoLabel.innerHTML = "Enter player two..";
        return;
    }

    playerOneLabel.value

    for (let i = 0; i < players.length; i++) {
        let playersText = "";
        let player = players[i];

        playersText += "Name: " + player.name + "<br>";
        playersText += "Symbol: " + player.symbol + "<br>";
        playersText += "Points: " + player.points + "<br>";

        console.log("Player is: " + JSON.stringify(players[i]) + JSON.stringify(playerOneLabel.points));

        if (i == 0) {
            playerOneLabel.innerHTML = playersText;

            addPointsPlayerOneButton.parentElement.style.visibility = "visible";// Shows add points button
        } else if (i == 1) {
            playerTwoLabel.innerHTML = playersText;

            addPointsPlayerTwoButton.parentElement.style.visibility = "visible";// Shows add points button
        } else {
            return;
        }
    }
}

function resetGame() {
    console.log("Resetting the game");
    players = [];
    printPlayers();
    addPointsPlayerOneButton.parentElement.classList.add('hidden');
    addPointsPlayerTwoButton.parentElement.classList.add('hidden')
}
function status() {
    setTimeout(function () { gameStatus.textContent = ""; }, 3000);
}
function clearField() {
    console.log("Resetting the game");
    for (let i = 0; i < fields.length; i++) {
        fields[i].textContent = "";
    }
}

function addPointsPlayerOne() {
    console.log("Adding a point to score of player 1");
    players[0].addPoints();

    printPlayers();
}

function addPointsPlayerTwo() {
    console.log("Adding a point to score of player 2");
    players[1].addPoints();

    printPlayers();
}



for (let i = 0; i < fields.length; i++) {
    fields[i].addEventListener('click', function () {
        addSymbolToField(this);
        checkWinner();


    })

}

function addSymbolToField(field) {
    const fieldContent = field.textContent;
    if (fieldContent === 'X' || fieldContent === 'O') {
        alert('This field can not be used');
    }
    field.textContent = players[currentPlayer].symbol;
    currentPlayer++;
    if (currentPlayer > 1) {
        currentPlayer = 0;
    }


}
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function checkWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
        const winline = winningConditions[i];
        let winX = true;
        let winO = true;
        for (let j = 0; j < winline.length; j++) {
            const fieldIndex = winline[j];
            const field = fields[fieldIndex].textContent.toLowerCase();
            if (field === "x") {
                winO = false;
            }
            else if (field === "o") {
                winX = false;
            }
            else {
                winO = winX = false;
            }
        }
        if (winX) {
            alert("X IS winner")
            addPointsPlayerOne();
            gameStatus.textContent = "";
            const p = document.createElement("p");
            p.textContent = players[0].name + " " + "Win!";
            gameStatus.append(p);
            setTimeout(clearField, 2000);
            status();
        }
        else if (winO) {
            alert("O Is winner");
            addPointsPlayerTwo();
            gameStatus.textContent += "";
            const p = document.createElement("p");
            p.textContent = players[1].name + " " + "Win!";
            gameStatus.append(p);
            setTimeout(clearField, 2000);
            status();
        }
        else if ((fields[0].textContent == 'X' || fields[0].textContent == 'O') && (fields[1].textContent == 'X'
            || fields[1].textContent == 'O') && (fields[2].textContent == 'X' || fields[2].textContent == 'O') &&
            (fields[3].textContent == 'X' || fields[3].textContent == 'O') && (fields[4].textContent == 'X' ||
                fields[4].textContent == 'O') && (fields[5].textContent == 'X' || fields[5].textContent == 'O') &&
            (fields[6].textContent == 'X' || fields[6].textContent == 'O') && (fields[7].textContent == 'X' ||
                fields[7].textContent == 'O') && (fields[8].textContent == 'X' || fields[8].textContent == 'O')) {
            gameStatus.textContent = "";
            const p = document.createElement("p");
            p.textContent = "Draw";
            gameStatus.append(p);
            setTimeout(clearField, 2000);
            status();
        }

    }

}


