'use strict';
let playerNum = 2;
const userPanelElement = document.getElementsByClassName("user-panel")[0];


//Player object, dynamiclly creates and stores the required number of players
let playersCont = {

    //Temp obj used to create as many player objects as required
    clonePlayer: {
        playerNum: 1,
        playerCurrentScore:0,
        playerTotalScore: 0,
        playerPanel: null,
    },

    //Called to create player objects
    createPlayer: function(numOfPlayers){
    
        //Creates a UI panel for each player object
        function createUserPanel(){
            const  playerPanel = userPanelElement.cloneNode(true);
            document.getElementsByClassName("game-panel")[0].appendChild(playerPanel);
            return playerPanel;
        }

        //Returns the string to correcly name each object
        function playerString(playerNum){
            let outString = `player-${playerNum}`
            return outString;
        };

        //Creates player objects by looping as many times as there are players needed
        for(let i = 0; i < numOfPlayers; i++){
            const playerClone = structuredClone(this.clonePlayer);
            playerClone.playerNum = i;
            playerClone.playerPanel = createUserPanel();
            this[playerString(i)] = playerClone;  
        };

        //Removes inital player UI element
        userPanelElement.remove();
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
};


let gameStateUi = {
    
    //State Classes
    hidden: "hidden",
    visible: "dis-flex",
    visibleCol: "dis-flex-col",

    //UI element objects
    startPanel: {
        startUiElement: document.getElementsByClassName("start-panel")[0],

        setVisible: function (){
            this.startUiElement.classList.add(gameStateUi.visibleCol);
            this.startUiElement.classList.remove(gameStateUi.hidden);
        },

        setHidden: function(){
            this.startUiElement.classList.add(gameStateUi.hidden);
            this.startUiElement.classList.remove(gameStateUi.visibleCol);
        },
    },

    gamePlayElements: {
        gamePlayElement: document.getElementsByClassName("game-play-elements")[0],

        setVisible: function (){
            this.gamePlayElement.classList.add(gameStateUi.visibleCol);
            this.gamePlayElement.classList.remove(gameStateUi.hidden);

        },

        setHidden: function(){
            this.gamePlayElement.classList.add(gameStateUi.hidden);
            this.gamePlayElement.classList.remove(gameStateUi.visibleCol);
        },
    },

    endPanel: {
        endPanelElement: document.getElementsByClassName("game-play-elements")[0],

        setVisible: function (){
            this.endPanelElement.classList.add(this.visible);
            this.endPanelElement.classList.remove(this.hidden);
        },

        setHidden: function(){
            this.endPanelElement.classList.add(this.hidden);
            this.endPanelElement.classList.remove(this.visible);
        },
    },

    //UI state methods
    startState: function(){
        this.startPanel.setVisible();
        this.gamePlayElements.setHidden();
        this.endPanel.setHidden();
    },

    gamePlayState: function(){
        this.startPanel.setHidden();
        this.gamePlayElements.setVisible();
        this.endPanel.setHidden();
    },

    endState: function(){
        this.startPanel.setHidden();
        this.gamePlayElements.setHidden();
        this.endPanel.setVisible();
    },

};

//Sets number of players - Updates player-num-display UI element
function playerNumDisplay(event){
    const btnClick = event.target.id; //stores the id of clicked button

    // //Decrease playerNum
    if(btnClick === "previous" && playerNum > 2){
        playerNum --;
    } else if(btnClick === "previous" && playerNum === 2){
        playerNum = 4;
    };

    // Increase playerNum
    if(btnClick === "increase" && playerNum < 4){
        playerNum ++;
    } else if(btnClick === "increase" && playerNum === 4){
        playerNum = 2;
    };

    //Updates UI with current number
    const playerNumString = playerNum.toString();
    startPanelUi.numDisaply.textContent = playerNumString;
};

//Start Panel button clicks
startPanelUi.decreaseButton.addEventListener("click", playerNumDisplay);
startPanelUi.increaseButton.addEventListener("click", playerNumDisplay);

startPanelUi.startButton.addEventListener("click", function(){
    playersCont.createPlayer(playerNum);
    gameStateUi.gamePlayState();
    console.log(gameStateUi);
});
