var canvas;
var stage: createjs.Stage;

// Game Objects 
//var helloText: createjs.Text;
var background: createjs.Bitmap;


var leftReel: createjs.Bitmap;
var centerReel: createjs.Bitmap;
var rightReel: createjs.Bitmap;

var defaultReelL: createjs.Bitmap;
var defaultReelC: createjs.Bitmap;
var defaultReelR: createjs.Bitmap;

var currentImageLeft = 1;
var currentImageCenter = 1;
var currentImageRight = 1;

var spinsLeft;
var timesSpunLeft;

var spinsCenter;
var timesSpunCenter;

var spinsRight;
var timesSpunRight;

var gameOn = false;
var reset = false;

//The LOCATION where the values shall be placed.
var currentBalance;
var currentBet;
var currentJackPot;
var jackPotWon;
var betWon;
var betLost;

//The values of the various money
var bal;
var bet;
var jackPot;

//Flags
var jp;
var won;
var lost;

var payOut = false;


function init() {

    timesSpunLeft = 0;
    timesSpunCenter = 0;
    timesSpunRight = 0;

    bal = 500;
    bet = 50;
    jackPot = 500;

    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    //stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);
    
    // Bitmap background
    background = new createjs.Bitmap("assets/images/NewSlot.png");

    //Scale and position the background image
    background.scaleX = 2.30;
    background.scaleY = 1.30;
    background.regX = -90;
    background.regY = -20;

    //Watch for a click to start spinning reels
    background.addEventListener("click", backgroundClicked, false);

    //This function updates all the stages to display the new images. 
    updateStages();
}

function setUpReels() {
    //Scale and position the left reel
    leftReel = new createjs.Bitmap("assets/images/Melon.png");
    leftReel.regX = -250;
    leftReel.regY = -100;
    leftReel.scaleX = 1.5;
    leftReel.scaleY = 1.5;

    //Scale and position the center reel
    centerReel = new createjs.Bitmap("assets/images/Melon.png");
    centerReel.regX = -420;
    centerReel.regY = -100;
    centerReel.scaleX = 1.5;
    centerReel.scaleY = 1.5;

    //Scale and position the right reel
    rightReel = new createjs.Bitmap("assets/images/Melon.png");
    rightReel.regX = -590;
    rightReel.regY = -100;
    rightReel.scaleX = 1.5;
    rightReel.scaleY = 1.5;
}

//Assign random spin values to each reel
function setSpinAmounts() {
    spinsLeft = Math.floor(Math.random() * 7 + 1);
    spinsCenter = Math.floor(Math.random() * 7 + 1);
    spinsRight = Math.floor(Math.random() * 7 + 1);
}

function gameLoop() {

    //When the user clicks to start a new game, we need to reset some things.
    if (reset == true) {
        reset = false;
        timesSpunLeft = 0;
        timesSpunRight = 0;
        timesSpunCenter = 0;

        currentImageLeft = 0;
        currentImageRight = 0;
        currentImageCenter = 0;
    }

    //This flag determines if the game has been started by the user, or if the page has just been loaded. When they click to start, the game begins.
    if (gameOn == true) {
        //Spin the left reel
        leftReelSpin();

        //Spin the left reel
        centerReelSpin();

        //Spin the right reel
        rightReelSpin();

        //The spins are complete! Did they win or loose...?
        if (payOut == true && timesSpunLeft == spinsLeft && timesSpunRight == spinsRight && timesSpunCenter == spinsCenter) {
            winOrLoose();
            updateStages();
            payOut = false;
        }
    }

    stage.update();
}

//This function updates the stage in the correct order, and keeps everything on screen
function updateStages() {

    //Default starting position for reels
    if (gameOn == false) {
        defaultReelImage();
    }

    //Add the left reel behind the background
    stage.addChild(leftReel);
    stage.addChild(centerReel);
    stage.addChild(rightReel);

    //Bring the background back to front
    stage.addChild(background);

    if (jp == true) { //Display a message that they have won the jackpot!
        stage.addChild(jackPotWon);
        jp = false;
    }

    if (won == true) { //Display a message that they have won 
        stage.addChild(betWon);
        won = false;
    }

    if (lost == true) { //Display a message that they have won 
        stage.addChild(betLost);
        lost = false;
    }

    //Display the cash values
    displayMoney();
    stage.addChild(currentBalance);
    stage.addChild(currentBet);
    stage.addChild(currentJackPot);
}

//Set the default image into the first slots
function defaultReelImage() {
    //Display default in Left reel
    defaultReelL = new createjs.Bitmap("assets/images/spin.jpg");
    defaultReelL.regX = -350;
    defaultReelL.regY = -240;
    stage.addChild(defaultReelL);
    
    //Display default in Center reel
    defaultReelC = new createjs.Bitmap("assets/images/spin.jpg");
    defaultReelC.regX = -600;
    defaultReelC.regY = -240;
    stage.addChild(defaultReelC);

    //Display default in Right reel
    defaultReelR = new createjs.Bitmap("assets/images/spin.jpg");
    defaultReelR.regX = -850;
    defaultReelR.regY = -240;
    stage.addChild(defaultReelR);
}

function winOrLoose() {
    //Since the reels are incremented each time they are spun, the value of currentImage is always one ahead of the actual displayed image.
    currentImageLeft --;
    currentImageRight --;
    currentImageCenter--;

    updateStages();

    //Three BARS! You win the jackpot!
    if (currentImageLeft == 1 && currentImageRight == 1 && currentImageCenter == 1) {
        bal = (bal + jackPot);
        jackPot = 0;
        //Set a flag that they hit the Jack Pot
        jp = true;
        return;
    }

    //Three of the same, you WIN!
    if (currentImageLeft == currentImageRight && currentImageRight == currentImageCenter) {
        bal = (bal + bet);

        //Set a flag that they won.
        won = true;
        return;
    }

    //Gold bars are WILD, 2 WILDS = WIN!
    if (currentImageLeft == 1 && currentImageRight == 1 || currentImageCenter == 1 && currentImageRight == 1 || currentImageCenter == 1 && currentImageLeft == 1){
        bal = (bal + bet);

        //Set a flag that they won.
        won = true;
        return;
    }

    //Two match and one WILD, you WIN!
    if (currentImageLeft == currentImageRight && currentImageCenter == 1 || currentImageRight == currentImageCenter && currentImageLeft == 1 || currentImageLeft == currentImageCenter && currentImageRight == 1){
        bal = (bal + bet);

        //Set a flag that they won.
        won = true;
        return;
    }

    //Three not the same, nor with WILDS, you LOOSE!
    if (currentImageLeft != currentImageRight || currentImageRight != currentImageCenter){
        bal = (bal - bet);

        //They lost, add half their bet to the jackpot.
        jackPot = jackPot + (bet / 2);

        //Set a flag that they lost.
        lost = true;
        return;
    }
}

//Spin the left reel
function leftReelSpin() {
    //If the current image has reached the bottom of the viewing window, and we are not at the max number of spins, get the next image and continue.
    if (leftReel.regY <= -250 && (timesSpunLeft < spinsLeft))
        newReelLeft();

    //If the image is not at the bottom of the viewing window, keep moving it down.
    else if (timesSpunLeft < spinsLeft)
        leftReel.regY = (leftReel.regY - 10);

    //If its time to stop, bring the image down until it is centered in the viewing window. 
    else if (timesSpunLeft == spinsLeft && (leftReel.regY > -170))
        leftReel.regY = (leftReel.regY - 10);
}

//Spin the center reel
function centerReelSpin() {
    //If the current image has reached the bottom of the viewing window, and we are not at the max number of spins, get the next image and continue.
    if (centerReel.regY <= -250 && (timesSpunCenter < spinsCenter))
        newReelCenter();

    //If the image is not at the bottom of the viewing window, keep moving it down.
    else if (timesSpunCenter < spinsCenter)
        centerReel.regY = (centerReel.regY - 10);

    //If its time to stop, bring the image down until it is centered in the viewing window. 
    else if (timesSpunCenter == spinsCenter && (centerReel.regY > -170))
        centerReel.regY = (centerReel.regY - 10);
}

//Display the current values of balance, bet and jackpot
function displayMoney() {
    //Display starting money
    currentBalance = new createjs.Text("Bal:" + "$" + bal, "25px Consolas", "#FFFFFF");
    currentBalance.x = 400;
    currentBalance.y = 405;

    //Display bet
    currentBet = new createjs.Text("Bet:" + "$" + bet, "25px Consolas", "#FFFFFF");
    currentBet.x = 630;
    currentBet.y = 405;

    //Display jackpot 
    currentJackPot = new createjs.Text("JackPot:" + "$" + jackPot, "25px Consolas", "#FFFFFF");
    currentJackPot.x = 860;
    currentJackPot.y = 405;
 
    //Display won the jackpot notice
    jackPotWon = new createjs.Text("JackPot!!!", "25px Consolas", "#FFFFFF");
    jackPotWon.x = 630;
    jackPotWon.y = 150;

    //Display won the jackpot notice
    betWon = new createjs.Text("You WIN!", "25px Consolas", "#FFFFFF");
    betWon.x = 630;
    betWon.y = 150;

    //Display won the jackpot notice
    betLost = new createjs.Text("You LOOSE!", "25px Consolas", "#FFFFFF");
    betLost.x = 630;
    betLost.y = 150;
    
}

//Spin the right reel
function rightReelSpin() {
    //If the current image has reached the bottom of the viewing window, and we are not at the max number of spins, get the next image and continue.
    if (rightReel.regY <= -250 && (timesSpunRight < spinsRight))
        newReelRight();

    //If the image is not at the bottom of the viewing window, keep moving it down.
    else if (timesSpunRight < spinsRight)
        rightReel.regY = (rightReel.regY - 10);

    //If its time to stop, bring the image down until it is centered in the viewing window. 
    else if (timesSpunRight == spinsRight && (rightReel.regY > -170))
        rightReel.regY = (rightReel.regY - 10);
}

//Clear the game by killing all the children.
function clearSlots() {
    //Remove all children
    stage.removeChild(leftReel);
    stage.removeChild(centerReel);
    stage.removeChild(rightReel);

    stage.removeChild(defaultReelL);
    stage.removeChild(defaultReelR);
    stage.removeChild(defaultReelC);
}

// Event handler
function backgroundClicked(e) {
    //Get the position of the mouse so we know if its on a button or not
    var xPosition = e.clientX;
    var yPosition = e.clientY;

    clearSlots();
  
    gameOn = true;
    reset = true;
    payOut = true;
    setSpinAmounts();

    setUpReels();
  //  updateStages();

    console.log("x = " + e.clientX)
    console.log("y = " + e.clientYw)

}

//This function gets the next image in the reel for the left reel.
function newReelLeft() {
    //Clear the stage
    stage.clear();

    //If we need a new reel image, get the next one.
    if (timesSpunLeft < spinsLeft) {
        switch (currentImageLeft) {
            case 0:
                //Scale and position the reels
                leftReel = new createjs.Bitmap("assets/images/Melon.png");
                leftReel.regY = -100;
                leftReel.regX = -250;
                leftReel.scaleX = 1.5;
                leftReel.scaleY = 1.5;
                
                //Update the stages
                updateStages();

                //Change image
                currentImageLeft++;
                timesSpunLeft++;
                break;

            case 1:
                //Scale and position the reels
                leftReel = new createjs.Bitmap("assets/images/Bar.png");
                leftReel.regY = -100;
                leftReel.regX = -250;
                leftReel.scaleX = 1.5;
                leftReel.scaleY = 1.5;

                //Update the stages
                updateStages();

                //Change image
                currentImageLeft++;
                timesSpunLeft++;
                break;

            case 2:
                //Scale and position the reels
                leftReel = new createjs.Bitmap("assets/images/Lemon.png");
                leftReel.regY = -100;
                leftReel.regX = -250;
                leftReel.scaleX = 1.5;
                leftReel.scaleY = 1.5;

                //Update the stages
                updateStages();

                //Change image
                currentImageLeft = 0;
                timesSpunLeft++;
                break;
        }
    }
}

//This function gets the next image in the reel for the center reel.
function newReelCenter() {
    //Clear the stage
    stage.clear();

      //If we need a new reel image, get the next one.
    if (timesSpunCenter < spinsCenter) {
        switch (currentImageCenter) {
            case 0:
                //Scale and position the reels
                centerReel = new createjs.Bitmap("assets/images/Melon.png");
                centerReel.regY = -100;
                centerReel.regX = -420;
                centerReel.scaleX = 1.5;
                centerReel.scaleY = 1.5;

                //Update the stages
                updateStages();

                //Change image
                currentImageCenter++;
                timesSpunCenter++;
                break;

            case 1:
                //Scale and position the reels
                centerReel = new createjs.Bitmap("assets/images/Bar.png");
                centerReel.regY = -100;
                centerReel.regX = -420;
                centerReel.scaleX = 1.5;
                centerReel.scaleY = 1.5;

                //Update the stages
                updateStages();

                //Change image
                currentImageCenter++;
                timesSpunCenter++;
                break;

            case 2:
                //Scale and position the reels
                centerReel = new createjs.Bitmap("assets/images/Lemon.png");
                centerReel.regY = -100;
                centerReel.regX = -420;
                centerReel.scaleX = 1.5;
                centerReel.scaleY = 1.5;

                //Update the stages
                updateStages();

                //Change image
                currentImageCenter = 0;
                timesSpunCenter++;
                break;
        }
    }
}

//This function gets the next image in the reel for the right reel.
function newReelRight() {
    //Clear the stage
    stage.clear();

      //If we need a new reel image, get the next one.
    if (timesSpunRight < spinsRight) {
        switch (currentImageRight) {
            case 0:
                //Scale and position the reels
                rightReel = new createjs.Bitmap("assets/images/Melon.png");
                rightReel.regY = -100;
                rightReel.regX = -590;
                rightReel.scaleX = 1.5;
                rightReel.scaleY = 1.5;

                //Update the stages
                updateStages();

                //Change image
                currentImageRight++;
                timesSpunRight++;
                break;

            case 1:
                //Scale and position the reels
                rightReel = new createjs.Bitmap("assets/images/Bar.png");
                rightReel.regY = -100;
                rightReel.regX = -590;
                rightReel.scaleX = 1.5;
                rightReel.scaleY = 1.5;

                //Update the stages
                updateStages();

                //Change image
                currentImageRight++;
                timesSpunRight++;
                break;

            case 2:
                //Scale and position the reels
                rightReel = new createjs.Bitmap("assets/images/Lemon.png");
                rightReel.regY = -100;
                rightReel.regX = -590;
                rightReel.scaleX = 1.5;
                rightReel.scaleY = 1.5;

                //Update the stages
                updateStages();

                //Change image
                currentImageRight = 0;
                timesSpunRight++;
                break;
        }
    }

}
