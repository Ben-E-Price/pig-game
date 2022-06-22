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
            this[playerString(i)] = playerClone; //Creates a keypair value
        };

        //Removes inital player UI element
        userPanelElement.remove();
        //Removes the temp object after player objects are created
        delete this.clonePlayer;
    },
};

//Contains all start panel UI elements
const startPanelUi = {
    decreaseButton: document.getElementById("previous"),
    increaseButton: document.getElementById("increase"),
    numDisaply: document.getElementById("player-num-dis"),
    startButton: document.getElementById("start-btn"),
};

//Contains button elements from game-play-elements
const gamePlayElementButtons = {
    btnDiceRoll: document.getElementById("roll-btn"),
    btnHold: document.getElementById("hold-btn"),
};

let gameStateUi = {
    
    //State Classes
    hidden: "hidden",
    visible: "dis-flex",
    visibleCol: "dis-flex-col",

    //UI element objects 
    //Objects contain elements with functions to change their visibility
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

            //Sets the direction of game-play-elements depending on number of players
            if(playerNum === 3) {
                this.gamePlayElement.classList.add(gameStateUi.visible);
                this.gamePlayElement.style.justifyContent = "center";
            } else {
                this.gamePlayElement.classList.add(gameStateUi.visibleCol);
            };
                       
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

//UI dice images
const diceImg = {
    imgElement: document.getElementById("dice-img"),
    img1: "dice-1.png",
    img2: "dice-2.png",
    img3: "dice-3.png",
    img4: "dice-4.png",
    img5: "dice-5.png",
    img6: "dice-6.png",

    //Changes img based on numInput
    changeImg: function(numInput){
        switch(numInput){
            case 1:
                this.imgElement.src = this.img1;
                break;
            case 2:
                this.imgElement.src = this.img2;
                break;
            case 3:
                this.imgElement.src = this.img3;
                break;
            case 4:
                this.imgElement.src = this.img4;
                break;
            case 5:
                this.imgElement.src = this.img5;
                break;
            case 6:
                this.imgElement.src = this.img6;
                break;
            default:
                console.log("error selecting img");
        };
    },
};

function setActivePlayer() {
    const activePlayer = playersCont[`player-${1}`];
    activePlayer.playerCurrentScore = 100;
    console.log(activePlayer);
};

function rollDice(){    
    function randNum(highestNum){
        const randVal = Math.floor(Math.random() * highestNum + 1);
        return randVal;
    };

    let diceValue = randNum(6);
    console.log(diceValue);
    diceImg.changeImg(diceValue);
};

//Set an active player
//Either Add dice value to current score of active player, 
//if active player holds add current score to over all score

//Start Panel button clicks
startPanelUi.decreaseButton.addEventListener("click", playerNumDisplay);
startPanelUi.increaseButton.addEventListener("click", playerNumDisplay);

startPanelUi.startButton.addEventListener("click", function(){
    playersCont.createPlayer(playerNum);
    gameStateUi.gamePlayState();
    console.log(playersCont);
});

gamePlayElementButtons.btnDiceRoll.addEventListener("click", function(){
    rollDice();
    setActivePlayer();
});