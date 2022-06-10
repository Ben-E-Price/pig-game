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

playersCont.createPlayer(4);

console.log(playersCont);