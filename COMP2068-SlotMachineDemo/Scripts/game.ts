/*ASSIGNMENT TWO, WEB PROGRAMMING*/
/* Version 12*/

//Canvas and stage
var canvas;
var stage: createjs.Stage;

//Slot machine background image
var background: createjs.Bitmap;

//Reel images
var leftReel: createjs.Bitmap;
var centerReel: createjs.Bitmap;
var rightReel: createjs.Bitmap;

//To allow for the required default image on reels before spinning
var defaultReelL: createjs.Bitmap;
var defaultReelC: createjs.Bitmap;
var defaultReelR: createjs.Bitmap;

//Buttons
var button_BetOne: createjs.Bitmap;
var button_BetMax: createjs.Bitmap;
var button_Reset: createjs.Bitmap;
var button_Spin: createjs.Bitmap;

//Disabled
var button_Spin_Disabled: createjs.Bitmap;

//Keep track of which image is being displayed, so we know what score they got
var currentImageLeft = 1;
var currentImageCenter = 1;
var currentImageRight = 1;

//These controls are for the placement of text messages on the background
var currentBalance;//Post their balance
var currentBet;//Post their bet
var currentJackPot;//Post the current available jackpot

//Reel spin controls (spinsLeft, center and right are how many times TO spin. Times spun is how many times it HAS BEEN spun)
var spinsLeft;//How many times will the left wheel spin?
var timesSpunLeft;//How many times HAS the left wheel spun?

var spinsCenter;//How many times will the center wheel spin?
var timesSpunCenter;//How many times HAS the left wheel spun?

var spinsRight;//How many times will the right wheel spin?
var timesSpunRight;//How many times HAS the left wheel spun?

//Messages to the user
var betWon;//Post a message saying they won!
var betLost;//Post a message saying they lost!
var jackPotWon;//Post a message saying they won...the jackpot!

//The balances of the various money amounts
var bal;//How much do they have?
var bet;//How much do they bet?
var jackPot;//Whats the jack pot? (add half of every loss to jack pot, the other half we keep!)

//Flags of events
var jp;//Did they win the Jackpot?
var won;//Did they win?
var lost;//Did they loose? (Can't just use win, since before the game starts they haven't won, or lost).
var payOut;//Used to tell when they have spun, so they are only paid ONCE per WIN.
var gameOn;//Used to tell if the first spin has occured yet
var reset;//Used to reset the game.
var disableSpin;//Used if there bet is more then they have. 

function init() {
    //Default values
    //Flags
    gameOn = false;//Flag set true once the game has begun (once they click spin the first time)
    reset = false;//Flag used to dictate that we are to reset the game
    payOut = false;//Has a "round" completed? A round is defined as all wheels starting and running until they have reached the correct number of spins
    won = false;//Did they win?
    lost = false;//Did they loose?
    disableSpin = false;

    //Values
    //Times spun
    timesSpunLeft = 0;
    timesSpunCenter = 0;
    timesSpunRight = 0;
    //Spins to do
    spinsLeft = 0;
    spinsRight = 0;
    spinsCenter = 0;
    //Monetary Balances
    bal = 500;
    bet = 50;
    jackPot = 500;

    //**Game Set Up**
    //Set up canvas and stage
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);

    //Create ticker to cause game loop
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);

    //**Bitmap Image Assignment**
    //Background
    background = new createjs.Bitmap("assets/images/NewSlot.png");

    //**Buttons**
    button_BetOne = new createjs.Bitmap("assets/images/betOneButton.png");
    button_BetMax = new createjs.Bitmap("assets/images/betMaxButton.png");
    button_Reset = new createjs.Bitmap("assets/images/resetButton.png");
    button_Spin = new createjs.Bitmap("assets/images/spinButton.png");
    button_Reset = new createjs.Bitmap("assets/images/resetButton.png");

    //Disabled Buttons
    button_Spin_Disabled = new createjs.Bitmap("assets/images/spinButtonDisabled.png");

    //**Event Handlers**
    button_BetOne.addEventListener("click", betOneClicked, false);
    button_BetMax.addEventListener("click", betMaxClicked, false);
    button_Reset.addEventListener("click", resetClicked, false);
    button_Spin.addEventListener("click", spinClicked, false);

    //***Scaling and positioning***
    //Background
    background.scaleX = 2.30;
    background.scaleY = 1.30;
    background.regX = -90;
    background.regY = -20;

    //Spin Button
    button_Spin.regX = -348;
    button_Spin.regY = -265;
    button_Spin.scaleX = 2.7;
    button_Spin.scaleY = 1.9;

    //BetOne Button
    button_BetOne.regX = -197;
    button_BetOne.regY = -284;
    button_BetOne.scaleX = 2.8;
    button_BetOne.scaleY = 1.8;

    //BetMax Button
    button_BetMax.regX = -245;
    button_BetMax.regY = -284;
    button_BetMax.scaleX = 2.8;
    button_BetMax.scaleY = 1.8;

    //Reset Button
    button_Reset.regX = -102;
    button_Reset.regY = -284;
    button_Reset.scaleX = 2.8;
    button_Reset.scaleY = 1.8;

    //Disabled spin button
    button_Spin_Disabled.regX = -348;
    button_Spin_Disabled.regY = -265;
    button_Spin_Disabled.scaleX = 2.7;
    button_Spin_Disabled.scaleY = 1.9;

    //Messages
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

    //Display the default images on the reel, "Spin"
    defaultReelImage();

    //This function updates all the stages to display the new images. 
    updateStages(true);
}

//Handlers
function betOneClicked() {//If they wish to make a bet, the reels must be done spinning. If so, we will increase there bet by 50, to a max of 200, at which point it will loop back to 50. If they dont have enough cash, we disable spin.
    if (timesSpunLeft == spinsLeft && timesSpunCenter == spinsCenter && timesSpunRight == spinsRight) {
        //Increase current bet by 50 until it hits max, then loop back to the start (50)
            bet = (bet + 50);

        //The max bet is 200, since they clicked bet one, it will add the 50, realize its over and correct before displaying to the screen
        if (bet == 250)
            bet = 50;

        //Display the cash values
        updateStages(true);
    }
}

function betMaxClicked() {//If they wish to make a bet, the reels must be done spinning. If so, we will increase there bet by 50, to a max of 200, at which point it will loop back to 50. If they don't have enough cash, we disable spin.
        if (timesSpunLeft == spinsLeft && timesSpunCenter == spinsCenter && timesSpunRight == spinsRight) {//If the reels are not spinning!
            bet = 200;

            //Display the cash values
            updateStages(true);
        }
    }

    //Reset the game 
    function resetClicked() {
        //if the reels are not spinning, reset the game.
        if (timesSpunLeft == spinsLeft && timesSpunCenter == spinsCenter && timesSpunRight == spinsRight) {
            bal = 500;
            bet = 50;
            jackPot = 500;
            won = false;
            lost = false;
            jp = false;

            displayMoney();
            defaultReelImage();
            updateStages(true);
        }
    }
  
//They have clicked to spin the reels. We shall allow this.
function spinClicked() {

    if (disableSpin == false) {//If spin is not disabled due to betting more than they have
        clearSlots();//Wipe the slots so images don't stack

        //Flags
        gameOn = true;
        reset = true;
        payOut = true;

        //Randomly decide how many times each reel spins
        setSpinAmounts();

        updateStages(false);
    }
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
            updateStages(false);
            payOut = false;
        }
    }

    //Check if spin needs to be disabled, if so, set the flag and change the image!
    if (bet > bal) {
        stage.addChild(button_Spin_Disabled);
        disableSpin = true;
    }
    else {
        stage.addChild(button_Spin);
        disableSpin = false;
    }

    stage.update();
}

//This function updates the stage in the correct order, and keeps everything on screen
function updateStages(reels) {
    //When we need the default reels, like when we reset, we dont need these added on top of them, so skip this part.
    if (reels != true) {
        //Add the left reel behind the background
        stage.addChild(leftReel);
        stage.addChild(centerReel);
        stage.addChild(rightReel);
    }
    reels = false;

    //Bring the background to front
    stage.addChild(background);

    //Add the buttons 
    if (disableSpin == true)
        stage.addChild(button_Spin_Disabled);
    else
        stage.addChild(button_Spin);

    //Add the buttons to the stage
    stage.addChild(button_BetOne);
    stage.addChild(button_BetMax);
    stage.addChild(button_Reset);

    if (jp == true) { //Display a message that they have won the jackpot!
        stage.addChild(jackPotWon);
        won = false;
        lost = false;
    }
      
    if (won == true) { //Display a message that they have won 
        stage.addChild(betWon);
        lost = false;
        jp = false;
    }

    if (lost == true) { //Display a message that they have won 
        stage.addChild(betLost);
        won = false;
        jp = false;
    }

    //Display the cash values
    displayMoney();
}

//Set the default image into the first slots
function defaultReelImage() {
    //Clear the old images
    clearSlots();

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

    stage.update();
}

function winOrLoose() {
    //Since the reels are incremented each time they are spun, the value of currentImage is always one ahead of the actual displayed image.
    currentImageLeft --;
    currentImageRight --;
    currentImageCenter--;

    updateStages(false);

    //Three BARS! You win the jackpot!
    if (currentImageLeft == 1 && currentImageRight == 1 && currentImageCenter == 1) {
        bal = (bal + jackPot);
        jackPot = 0;
        //Set a flag that they hit the Jack Pot
        jp = true;
        won = false;
        lost = false;
        return;
    }

    //Three of the same, you WIN!
    if (currentImageLeft == currentImageRight && currentImageRight == currentImageCenter) {
        bal = (bal + bet);

        //Set a flag that they won.
        won = true;
        lost = false;
        jp = false;
        return;
    }

    //Gold bars are WILD, 2 WILDS = WIN!
    if (currentImageLeft == 1 && currentImageRight == 1 || currentImageCenter == 1 && currentImageRight == 1 || currentImageCenter == 1 && currentImageLeft == 1){
        bal = (bal + bet);

        //Set a flag that they won.
        won = true;
        lost = false;
        jp = false;
        return;
    }

    //Two match and one WILD, you WIN!
    if (currentImageLeft == currentImageRight && currentImageCenter == 1 || currentImageRight == currentImageCenter && currentImageLeft == 1 || currentImageLeft == currentImageCenter && currentImageRight == 1){
        bal = (bal + bet);

        //Set a flag that they won.
        won = true;
        lost = false;
        jp = false;
        return;
    }

    //Three not the same, nor with WILDS, you LOOSE!
    if (currentImageLeft != currentImageRight || currentImageRight != currentImageCenter){
        bal = (bal - bet);

        //They lost, add half their bet to the jackpot.
        jackPot = jackPot + (bet / 2);

        //Set a flag that they lost.
        lost = true;
        won = false;
        jp = false;
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
    currentBalance = new createjs.Text("Bal:" + "$" + bal, "20px Consolas", "#FFFFFF");
    currentBalance.x = 350;
    currentBalance.y = 405;

    //Display bet
    currentBet = new createjs.Text("Bet:" + "$" + bet, "20px Consolas", "#FFFFFF");
    currentBet.x = 630;
    currentBet.y = 405;

    //Display jackpot 
    currentJackPot = new createjs.Text("JackPot:" + "$" + jackPot, "20px Consolas", "#FFFFFF");
    currentJackPot.x = 780;
    currentJackPot.y = 405;

    //Add money to the game
    stage.addChild(currentBalance);
    stage.addChild(currentBet);
    stage.addChild(currentJackPot);
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
                updateStages(false);

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
                updateStages(false);

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
                updateStages(false);

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
                updateStages(false);

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
                updateStages(false);

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
                updateStages(false);

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
                updateStages(false);

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
                updateStages(false);

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
                updateStages(false);

                //Change image
                currentImageRight = 0;
                timesSpunRight++;
                break;
        }
    }

}
