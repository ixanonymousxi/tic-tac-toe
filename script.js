const gameBoard = (() => {
    //Module

    //Function to store board
    let boardState = [[],[],[]];

    //Function to update the board state
    const updateBoardState = (blocksArr) => {
        gameBoard.boardState = [[], [], []];

        blocksArr.forEach((block, index) => {
            if (index < 3) {
                gameBoard.boardState[0].push(block.innerHTML);
            } else if (index < 6) {
                gameBoard.boardState[1].push(block.innerHTML);
            } else {
                gameBoard.boardState[2].push(block.innerHTML);
            }
        });
    };

    return { boardState, updateBoardState };

})();


const gameFlow = (() => {

    //Variables
    const titleScreenContainer = document.querySelector("#newGameContainer");
    const playerFormContainer = document.querySelector("#playerFormContainer");
    const gameContainer = document.querySelector("#container");
    const blocksArr = document.querySelectorAll(".block");
    const nameDisplay = document.querySelector("#gameStatusContainer p");
    let players = [];
    let gameOver = false;



    //Create and store players
    const displayPlayerForm = () => {
        if (getComputedStyle(titleScreenContainer, null).display === "flex"){
            titleScreenContainer.style.display = "none";
        }else{
            gameReset();
        }

        playerFormContainer.style.display = "flex";  
    };

    const addPlayer = (event) => {
        event.preventDefault();

        const name = document.querySelector("#playerName");
        const playerOneSymbol = document.querySelector("#X-Symbol").checked ? "X" : "O";
        const playerTwoSymbol = document.querySelector("#X-Symbol").checked ? "O" : "X";

        const nameInputLabel = document.querySelector("#playerNameLabel");
        const symbolInput = document.querySelector("#symbolInput");

        if (nameInputLabel.innerHTML === "Player One Name:"){
            players.push(Player(name.value, playerOneSymbol));

            nameInputLabel.innerHTML = "Player Two Name:";
            symbolInput.style.display = "none";
        }else{
            players.push(Player(name.value, playerTwoSymbol));
            displayBoard();
            nameInputLabel.innerHTML = "Player One Name:"
            symbolInput.style.display = "flex";
        }

        name.value = "";
    };


    //Get current player and play their turn

    const playTurn = (event) => {
        if (!gameOver && event.target.innerHTML !== "X" && event.target.innerHTML !== "O"){
            players[0].takeTurn(event);
            players.push(players[0]);
            players.shift();

            nameDisplay.innerHTML = "Player: " + players[0].name;
            gameBoard.updateBoardState(blocksArr);

            if (isGameOver() === "win") {
                nameDisplay.innerHTML = players[1].name + " wins!";
            }

            if (isGameOver() === "draw") {
                nameDisplay.innerHTML = "Draw";
            }
        }
    };

    //Create new game board

    const displayBoard = () => {

        gameBoard.updateBoardState(blocksArr);

        playerFormContainer.style.display = "none";
        gameContainer.classList.add("gridLayout");

        blocksArr.forEach(block => {
            block.style.display = "flex";
        });

        nameDisplay.innerHTML = "Player: " + players[0].name;

    };

    //Option for new game

    const gameReset = () => {
        gameContainer.classList.remove("gridLayout");

        blocksArr.forEach(block => {
            block.innerHTML = "";
            block.style.display = "none";
        });

        nameDisplay.innerHTML = "<br>"
        players = [];
        gameOver = false;

        gameBoard.updateBoardState(blocksArr);
    };

    //Function to check end game state

    const isGameOver = () => {
        const board = gameBoard.boardState;

        //Check if Draw
        if (!board[0].includes("") && !board[1].includes("") && !board[2].includes("")){
            gameOver = true;
            return "draw";
        }

        //Check Rows
        board.forEach(row => {
            if (row.every(block => block === "X") || row.every(block => block === "O")){
                gameOver = true;
                return "win";
            }
        });

        //Check Columns
        for(let i = 0; i < board.length; i++){
            if ((board[0][i] === board[1][i] && board[0][i] === board[2][i]) &&
                (board[0][i] === "X" || board[0][i] === "O")){
                gameOver = true;
                return "win";
            }
        }

        //Check Diagonals 
        if (((board[0][0] === board[1][1] && board[0][0] === board[2][2]) ||
            (board[2][0] === board[1][1] && board[2][0] === board[0][2])) &&
            (board[1][1] === "X" || board[1][1] === "O")){
                gameOver = true;
                return "win";
            }

            
        return false;
    };

    return { addPlayer, displayPlayerForm, playTurn }
})();

const Player = (name, symbol) => {
    //Factory Function

    //Function to interact with the board on turn
    const takeTurn = (event) => {
        event.target.innerHTML = symbol;
    };
    //Function to initiate a player with name and symbol
    return { name, symbol, takeTurn };
  
}