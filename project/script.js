'use strict';
//Player object, dynamiclly creates and stores the required number of players
let playersCont = {

    //Temp obj used to create as many player objects as required
    clonePlayer: {
        playerNum: 1,
        playerCurrentScore:0,
        playerTotalScore: 0,
    },

    //Called to create player objects
    createPlayer: function(numOfPlayers){
    
        //Returns the string to correcly name each object
        function playerString(playerNum){
            let outString = `player-${playerNum}`
            return outString;
        };

        //Creates player objects by looping as many times as there are players needed
        for(let i = 0; i < numOfPlayers; i++){
            const playerClone = structuredClone(this.clonePlayer);
            playerClone.playerNum = i;
            this[playerString(i)] = playerClone;
        };

        //Removes the temp object after player objects are created
        delete this.clonePlayer;
    },
};

//Contains all start panel UI elements
let startPanelUi = {
    decreaseButton: document.getElementById("previous"),
    increaseButton: document.getElementById("increase"),
    numDisaply: document.getElementById("player-num-dis"),
    startButton: document.getElementById("start-btn"),
}

let playerNum = 4;

//Sets number of players - Updates player-num-display UI element
function playerNumDisplay(event){
    const btnClick = event.target.id; //stores the id of clicked button

    // //Decrease playerNum
    if(btnClick === "previous" && playerNum > 2){
        playerNum --;
    } else if(btnClick === "previous" && playerNum === 2){
        playerNum = 4;
    }

    // Increase playerNum
    if(btnClick === "increase" && playerNum < 4){
        playerNum ++;
    } else if(btnClick === "increase" && playerNum === 4){
        playerNum = 2;
    }

    //Updates UI with current number
    const playerNumString = playerNum.toString();
    startPanelUi.numDisaply.textContent = playerNumString;
};

//Start Panel button clicks
startPanelUi.decreaseButton.addEventListener("click", playerNumDisplay)
startPanelUi.increaseButton.addEventListener("click", playerNumDisplay)

playersCont.createPlayer(4);

console.log(playersCont);