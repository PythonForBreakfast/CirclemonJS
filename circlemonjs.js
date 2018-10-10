const player = {
    level: 1,
    health: 50,
    maxHealth: 50,
    gold: 100,
    potions: 1
}

const monster = {
    health: 50,
    maxHealth: 50
}

let status = "";

//The following functions are used to update the DOM.
function updateStatus(newStatus) {
    document.getElementById('status').innerHTML = newStatus;
}

function updatePlayerHealthBar() {
    let playerHealthPercentage = ((player.health / player.maxHealth) * 100).toString() + '%';
    document.getElementById('playerHealth').style.width = playerHealthPercentage;
    document.getElementById('healthPoints').innerHTML = player.health + ' / ' + player.maxHealth;
}

function updateMonsterHealthBar() {
    let monsterHealthPercentage = ((monster.health / monster.maxHealth) * 100).toString() + '%';
    document.getElementById('monsterHealth').style.width = monsterHealthPercentage;
    document.getElementById('monsterHealthPoints').innerHTML = monster.health + ' / ' + monster.maxHealth;
}

function displayPotions() {
    let potionArray = [];
    let inventoryBar = document.getElementById('potions');
    for (let num = 1; num <= player.potions; num++) {
        potionArray.push("\<img src='potion.png' style='height: 20px; width: 20px;' \>");
    }
    inventoryBar.innerHTML = potionArray.join(''); 
}

function displayGold() {
    document.getElementById('gold').innerHTML = player.gold;
}

//The following functions perform actions depending on if the game is won or lost.

function gameWin() {
    //Hide all the menus
    document.getElementById('outterWindow').style.display = "none";
    document.getElementById('mainMenu').style.display = "none";
    document.getElementById('battleMenu').style.display = "none";

    //Display the play button and rename it to "Play Again?"
    document.getElementById('gameBoard').style.height = "250px";
    document.getElementById('playButton').style.display = "inline-block"
    document.getElementById('victory').style.display = "inline";
    document.getElementById('playButton').innerHTML = "Play Again?";
}

function gameLoss() {
    //Hide all the menus
    document.getElementById('outterWindow').style.display = "none";
    document.getElementById('mainMenu').style.display = "none";
    document.getElementById('battleMenu').style.display = "none";

    //Display the play button and rename it to "Play Again?"
    document.getElementById('gameBoard').style.height = "250px";
    document.getElementById('playButton').style.display = "inline-block"
    document.getElementById('defeat').style.display = "inline";
    document.getElementById('playButton').innerHTML = "Play Again?";
}

//The following functions are responsible for starting a new game, loading the main menu, and starting a battle.

function newGame() {
    //inital game load state. Hide everything except gameboard and play button.
    document.getElementById('outterWindow').style.display = "none";
    document.getElementById('mainMenu').style.display = "none";
    document.getElementById('battleMenu').style.display = "none";
    document.getElementById('defeat').style.display = "none";
    document.getElementById('victory').style.display = "none";

    document.getElementById('gameBoard').style.height = "250px";
}

function loadGame() {
    //Hide all the DOM elements you don't need.
    document.getElementById('playButton').style.display = "none";
    document.getElementById('gameBoard').style.height = "";
    document.getElementById('logo').style.display = "none";
    document.getElementById('windowBox').style.display = "none";
    document.getElementById('defeat').style.display = "none";
    document.getElementById('victory').style.display = "none";
    
    //Display main menu and battle window
    document.getElementById('mainMenuPlayerImage').style.display = "inline";
    document.getElementById('outterWindow').style.display = "inline";
    document.getElementById('mainMenu').style.display = "inline";

    //reset player and monster
    player.gold = 40;
    player.health = 50;
    player.potions = 1;
    monster.health = 50;

    //Update the DOM
    updatePlayerHealthBar();
    updateMonsterHealthBar();
    displayPotions();
    displayGold();
    updateStatus("Welcome to Circlemon JS!");
}

function loadBattle() {
    //Hide the main menu
    document.getElementById('mainMenu').style.display = "none";
    document.getElementById('mainMenuPlayerImage').style.display = "none";

    //Display the battle menu and the player/monster images
    document.getElementById('windowBox').style.display = "grid";
    document.getElementById('battleMenu').style.display = "inline";
    updateStatus("You engaged a Monster!");
}

//The following functions control the Battle mechanics. 

function attack() {
    //Calculate damage done by the Player and the Monster
    let playerDamage = Math.floor((Math.random() + 0.1) * (player.level * 10));
    let monsterDamage = Math.floor((Math.random() + 0.05) * 12);

    //Adjust the health of Player and Monster depending on damage calculated above.
    monster.health -= playerDamage;
    player.health -= monsterDamage;

    //Calculate the percentage that the health bars should display and display it.
    updatePlayerHealthBar();
    updateMonsterHealthBar();

    //Check to see if the player or the monster died.
    if (player.health <= 0) {
        status = "You were defeated by the Monster!";
        player.health = 0;
        updateStatus(status);
        gameLoss();
    } else if (monster.health <= 0) {
        status = "You defeated the Monster!!";
        monster.health = 0;
        updateStatus(status);
        gameWin();
    } else {
        //Update the status bar to show the amount of damage done.
        status = "You attacked the Monster for " + playerDamage + " points of damage!";
        updateStatus(status);
    }
}

function drinkPotion() {
    if (player.potions > 0) {
        //Calculate amount of health to be gained from drinking the potion and add it to the player's health.
        let healthGain = 10;
        player.health += healthGain;

        //Make sure the player doesn't gain more than their maximum amount of health.
        player.health > player.maxHealth ? player.health = player.maxHealth : player.health = player.health;

        //Calculate the percentage that the health bar should display and display it.
        updatePlayerHealthBar();

        //Update the status bar
        status = "You drank a potion and regained " + healthGain + " health!";
        updateStatus(status);

        //Subtract a potion after a player uses one.
        player.potions -= 1;
        displayPotions();
    } else {
        status = "You don't have any potions!";
        updateStatus(status);
    }
}

//This function is for buying potions obviously :)
function buyPotion() {
    if (player.gold < 10) {
        status = "You don't have enough gold!";
        updateStatus(status);
    } else {
        player.potions += 1;
        player.gold -= 10;
        status = "You bought a potion!";
        updateStatus(status);
        displayPotions();
        displayGold();
    }
}

//This function controls the main menu that is displayed after the game is started.
function menu(option) {
    switch (option) {
        case 'fight':
            loadBattle();
            break;
        case 'buyPotion':
            buyPotion();
            break;
    }
}

newGame();