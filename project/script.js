'use strict';
let playerNum = 2;
const maxPlayers = 4;//Sets the maximum amount of players 
const winningScore = 5;//Controls the score requried to win
const userPanelElement = document.getElementsByClassName("user-panel")[0];


//Player object, dynamiclly creates and stores the required number of players
let playersCont = {

    //Temp obj used to create as many player objects as required
    clonePlayer: {
        playerDisName: null,
        playerCurrentScore:0,
        playerTotalScore: 0,
        playerPanel: null,

        //UI elements
        uiPlayerName: null,
        uiPlayerCurrentScore: null,
        uiPlayerOverallScore: null,
    },

    //Called to create player objects
    createPlayer: function(numOfPlayers){

        //Creates a UI panel for each player object
        function createUserPanel(){
            const  playerPanel = userPanelElement.cloneNode(true);
            document.getElementsByClassName("game-panel")[0].appendChild(playerPanel);
            return playerPanel;
        }

        function playerUiElemetns(playerObject, loopNum){
            loopNum ++; //Acounts for clonePlayer object existing
            playerObject.uiPlayerName = document.querySelectorAll(".player-heading")[loopNum];
            playerObject.uiPlayerCurrentScore = document.querySelectorAll(".current-score")[loopNum];
            playerObject.uiPlayerOverallScore = document.querySelectorAll(".overall-score")[loopNum];
        };

        //Returns the string to correcly name each object
        function playerDisplayName(playerNum){
            playerNum ++;

            let outString = `Player ${playerNum}`
            return outString;
        };

        //Creates player objects by looping as many times as there are players needed
        for(let i = 0; i < numOfPlayers; i++){
            const playerClone = structuredClone(this.clonePlayer);
            playerClone.playerNum = playerDisplayName(i);
            playerClone.playerPanel = createUserPanel();
            playerUiElemetns(playerClone, i);
            this[playerName(i)] = playerClone; //Creates a keypair value
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
        endPanelElement: document.getElementsByClassName("end-panel")[0],

        setVisible: function (){
            this.endPanelElement.classList.add(gameStateUi.visibleCol);
            this.endPanelElement.classList.remove(gameStateUi.hidden);
        },

        setHidden: function(){
            this.endPanelElement.classList.add(gameStateUi.hidden);
            this.endPanelElement.classList.remove(gameStateUi.visibleCol);
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
        playerNum = maxPlayers;
    };

    // Increase playerNum
    if(btnClick === "increase" && playerNum < maxPlayers){
        playerNum ++;
    } else if(btnClick === "increase" && playerNum === maxPlayers){
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

//Contains the object of the currently active player
let activePlayer = {
    name: "",
    playerObject: null,
    activePlayerNum: 0,

    //Retruns the current active player, Changes to the next active player
    changeActive: function() {
        this.resetCurrentScore();
        this.returnPlayer();
        this.setActivePlayer();
    },
    
    //Sets the active player object
    setActivePlayer: function(initStart) {
        //Iterates through players, reseting to player 1
        if(this.activePlayerNum === playerNum -1 || initStart){
            this.activePlayerNum = 0;
        } else {
            this.activePlayerNum ++;
        }

        this.playerObject = playersCont[this.name = playerName(this.activePlayerNum)];
    },

    //Returns the current player object back to playerCont
    returnPlayer: function() {
        playersCont[this.name] = this.playerObject;
    },

    //Resets the value of currentScore and updates UI
    resetCurrentScore: function() {
        this.playerObject.playerCurrentScore = 0;
        this.playerObject.uiPlayerCurrentScore.textContent = this.playerObject.playerCurrentScore;
    },

    //Adds value to players current score, Updates the UI with current score
    addCurrentScore: function(addScore) {

        this.playerObject.playerCurrentScore = this.playerObject.playerCurrentScore + addScore;

        //Ends the game if the win condition is met but currentScore has not been held
        if(this.playerObject.playerCurrentScore + this.playerObject.playerTotalScore >= winningScore) {
            this.addTotalScore();
        };

        this.playerObject.uiPlayerCurrentScore.textContent = this.playerObject.playerCurrentScore;
    },

    //Adds playerCurrentScore to playerTotalScore, Updates total score UI
    addTotalScore: function() {
        this.playerObject.playerTotalScore = this.playerObject.playerTotalScore + this.playerObject.playerCurrentScore;
        this.playerObject.uiPlayerOverallScore.textContent = this.playerObject.playerTotalScore;

        //Checks if the player has met the winning conditions.
        if(this.playerObject.playerTotalScore >= winningScore){
            winState();
            this.returnPlayer();
        };

        this.changeActive();
    },
};

//Returns naming for player objects
function playerName(playerNum) {
    return `player-${playerNum}`
};

function rollDice(){
    //Create a random number
    function randNum(highestNum){
        const randVal = Math.floor(Math.random() * highestNum + 1);
        return randVal;
    };

    let diceValue = randNum(6);
    diceImg.changeImg(diceValue);

    //Changes the player or Adds diceValue to activePlayers currentScore
    if(diceValue === 1){
        activePlayer.changeActive();
    } else {
        activePlayer.addCurrentScore(diceValue);
    };   
};

function winState() {

    gameStateUi.endState();

    //Creates UI scoreboard, displaying players in order of finishing position
    function scoreBoard() {

        //Create a sorted array of player scores + names
        function posArrayCreate() {
    
            let posArray = [];//Stores sorted scores + player names
            let currentHighestScore = 0;
            let currentHighestName = "";

            //Checks each array index postion - Rules out players already added
            function posArrayIncludes(playerName){
                let includes = false;

                posArray.forEach((element, index) => {
                    includes = posArray[index].includes(playerName) ? true : includes;
                });

                return includes;
            };

            //Loops as many time as positions within posArray are required - I.E once for each player
            for(let i = 0; i < playerNum; i++){
                
                //Compares player scores - Inserts the highest into posArray
                for(let i = 0; i < playerNum; i++) {
                    //Get current player and their score
                    const currentPlayer = playerName(i);
                    const comparisonScore = playersCont[currentPlayer].playerTotalScore;
                    
                    if(comparisonScore >= currentHighestScore && !posArrayIncludes(currentPlayer)){
                        currentHighestScore = comparisonScore;
                        currentHighestName = currentPlayer; 
                    };

                    //Inserts the highest score + name into posArray
                    if(i === playerNum - 1) {
                        posArray.push([currentHighestName, currentHighestScore]);
                        currentHighestScore = 0;// Reset current highest score
                        currentHighestName = "";//Reset players name
                    };

                    console.log(posArray)//Debug array check
                };
            };
            
            return posArray;
        };

        //Creates scoreboard elements
        function createScoreElements(posArray) {
            const posWrapperParent = document.getElementById("player-order-panel");
            const posWrapper = document.getElementsByClassName("player-pos-wrapper")[0];

            posArray.forEach((element, index) => {
                const wrapperClone = posWrapper.cloneNode(true);//Clones posWrapper and its child elements 

                //HARD TO READ - LOOK INTO ALT SOLUTIONS
                wrapperClone.children[0].textContent = posArray[index][0]//Sets position number
                wrapperClone.children[1].textContent = posArray[index][1]//Sets player text


                posWrapperParent.appendChild(wrapperClone);
            });

            posWrapper.remove();
        };

        createScoreElements(posArrayCreate());
    };

    scoreBoard();

};

//Start Panel button clicks
startPanelUi.decreaseButton.addEventListener("click", playerNumDisplay);
startPanelUi.increaseButton.addEventListener("click", playerNumDisplay);

startPanelUi.startButton.addEventListener("click", function(){
    playersCont.createPlayer(playerNum);
    gameStateUi.gamePlayState();
    activePlayer.setActivePlayer(true);
    console.log(playersCont)//player objects debugging
});

gamePlayElementButtons.btnDiceRoll.addEventListener("click", function(){
    rollDice();
});

gamePlayElementButtons.btnHold.addEventListener("click", function() {
    activePlayer.addTotalScore();
});
