﻿var canvas;
var stage;

// Game Objects
//var helloText: createjs.Text;
var background;
var stageHeight;
var stageWidth;

var leftReel;
var centerReel;
var rightReel;

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

var currentBalance;
var bal;

function init() {
    timesSpunLeft = 0;
    timesSpunCenter = 0;
    timesSpunRight = 0;

    bal = 500;

    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);

    //stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);
    main();
}

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
    }

    //This flag determines if the game has been started by the user, or if the page has just been loaded. When they click to start, the game begins.
    if (gameOn == true) {
        //Spin the left reel
        leftReelSpin();

        //Spin the left reel
        centerReelSpin();

        //Spin the right reel
        rightReelSpin();
    }

    stage.update();
}

//This function updates the stage in the correct order, and keeps everything on screen
function updateStages() {
    //Add the left reel behind the background
    stage.addChild(leftReel);
    stage.addChild(centerReel);
    stage.addChild(rightReel);

    //Bring the background back to front
    stage.addChild(background);

    //Display the balance values
    stage.addChild(currentBalance);
}

//Spin the left reel
function leftReelSpin() {
    //If the current image has reached the bottom of the viewing window, and we are not at the max number of spins, get the next image and continue.
    if (leftReel.regY <= -250 && (timesSpunLeft < spinsLeft))
        newReelLeft();
    else if (timesSpunLeft < spinsLeft)
        leftReel.regY = (leftReel.regY - 10);
    else if (timesSpunLeft == spinsLeft && (leftReel.regY > -170))
        leftReel.regY = (leftReel.regY - 10);
}

//Spin the center reel
function centerReelSpin() {
    //If the current image has reached the bottom of the viewing window, and we are not at the max number of spins, get the next image and continue.
    if (centerReel.regY <= -250 && (timesSpunCenter < spinsCenter))
        newReelCenter();
    else if (timesSpunCenter < spinsCenter)
        centerReel.regY = (centerReel.regY - 10);
    else if (timesSpunCenter == spinsCenter && (centerReel.regY > -170))
        centerReel.regY = (centerReel.regY - 10);
}

//Spin the right reel
function rightReelSpin() {
    //If the current image has reached the bottom of the viewing window, and we are not at the max number of spins, get the next image and continue.
    if (rightReel.regY <= -250 && (timesSpunRight < spinsRight))
        newReelRight();
    else if (timesSpunRight < spinsRight)
        rightReel.regY = (rightReel.regY - 10);
    else if (timesSpunRight == spinsRight && (rightReel.regY > -170))
        rightReel.regY = (rightReel.regY - 10);
}

// Event handler
function backgroundClicked(e) {
    //Get the position of the mouse so we know if its on a button or not
    var xPosition = e.clientX;
    var yPosition = e.clientY;

    // if (e.clientX < 325 && e.clientY < 468) {
    gameOn = true;
    reset = true;
    setSpinAmounts();

    // }
    console.log("x = " + e.clientX);
    console.log("y = " + e.clientYw);
}

function backgroundOut() {
    background.alpha = 1.0;
}

function backgroundOver() {
    background.alpha = 0.5;
}

//The main function
function main() {
    //Get the dimensions of the stage
    stageWidth = stage.canvas.width;
    stageHeight = stage.canvas.height;

    // Bitmap background
    background = new createjs.Bitmap("assets/images/NewSlot.png");

    //Scale and position the background image
    background.scaleX = 2.30;
    background.scaleY = 1.30;
    background.regX = -90;
    background.regY = -20;

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

    //Watch for a click to start spinning reels
    background.addEventListener("click", backgroundClicked, false);

    //Display starting money
    currentBalance = new createjs.Text("Bal: " + "$" + bal, "30px Consolas", "#FFFFFF");
    currentBalance.x = 400;
    currentBalance.y = 395;

    //This function updates all the stages to display the new images.
    updateStages();
}

//This function gets the next image in the reel for the left reel.
function newReelLeft() {
    //Clear the stage
    stage.clear();

    if (timesSpunLeft < spinsLeft) {
        switch (currentImageLeft) {
            case 0:
                //Scale and position the reels
                leftReel = new createjs.Bitmap("assets/images/Melon.png");
                leftReel.regY = -100;
                leftReel.regX = -250;
                leftReel.scaleX = 1.5;
                leftReel.scaleY = 1.5;

                updateStages();

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

                updateStages();

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

                updateStages();

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

    if (timesSpunCenter < spinsCenter) {
        switch (currentImageCenter) {
            case 0:
                //Scale and position the reels
                centerReel = new createjs.Bitmap("assets/images/Melon.png");
                centerReel.regY = -100;
                centerReel.regX = -420;
                centerReel.scaleX = 1.5;
                centerReel.scaleY = 1.5;

                updateStages();

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

                updateStages();

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

                updateStages();

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

    if (timesSpunRight < spinsRight) {
        switch (currentImageRight) {
            case 0:
                //Scale and position the reels
                rightReel = new createjs.Bitmap("assets/images/Melon.png");
                rightReel.regY = -100;
                rightReel.regX = -590;
                rightReel.scaleX = 1.5;
                rightReel.scaleY = 1.5;

                updateStages();

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

                updateStages();

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

                updateStages();

                currentImageRight = 0;
                timesSpunRight++;
                break;
        }
    }
}
//# sourceMappingURL=game.js.map
