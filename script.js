const gameBoard = (() => {
    //Module

    //Function to store board
    let boardState = [];
    const setBoard = () => {
        const blocksArr = document.querySelectorAll(".block");

        blocksArr.forEach(block => {
            boardState.push(block.innerHTML);
        });
    };
    //Function to get the board state
    const getBoardState = () => {
        setBoard();
        return boardState;
    };
    //Function to update the board state
    const updateBoardState = () => {};
    //Function to display board to window


    return{getBoardState};

})();


const gameFlow = (() => {
    //Create and store players
    const players = []
    const addPlayer = () => {
        const name = document.querySelector("#name");
        const symbol = document.querySelector("#symbol");

        players.push(Player(name,symbol));
    };
    //Create new game board
    //Option for new game

    const displayBoard = () => {
        document.querySelector("#newGameContainer").style.display = "none";
        document.querySelector("#container").classList.add("gridLayout");
        const blocksArr = document.querySelectorAll(".block");

        blocksArr.forEach(block => {
            block.style.display = "flex";
        });
    };
    //Function to check end game state

    const isGameOver = () => { };
    //Function to end game results.

    return{displayBoard}
})();

const Player = (name, symbol) => {
    //Factory Function

    //Function to interact with the board on turn
    const takeTurn = () => {};
    //Function to initiate a player with name and symbol
    return { name, symbol };
  
}