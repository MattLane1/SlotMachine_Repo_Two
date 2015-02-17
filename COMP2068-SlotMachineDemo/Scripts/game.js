var canvas;
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

function init() {
    timesSpunLeft = 0;

    timesSpunCenter = 0;

    timesSpunRight = 0;

    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
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
    if (reset == true) {
        reset = false;
        timesSpunLeft = 0;
        timesSpunRight = 0;
        timesSpunCenter = 0;
    }

    if (gameOn == true) {
        //Spin the left reel
        leftReelSpin();

        //Spin the left reel
        centerReelSpin();

        //Spin the right reel
        rightReelSpin();
    }

    stage.update();
    //console.log("currentImageCenter = " + currentImageCenter)
    //Testing
    // console.log("Spins = " + spinsLeft)
    // console.log("timesSpun = " + timesSpunLeft)
}

function leftReelSpin() {
    //Left Reel Section
    if (leftReel.regY <= -250 && (timesSpunLeft < spinsLeft))
        newReelLeft();
    else if (timesSpunLeft < spinsLeft)
        leftReel.regY = (leftReel.regY - 10);
    else if (timesSpunLeft == spinsLeft && (leftReel.regY > -170))
        leftReel.regY = (leftReel.regY - 10);
}

//Spin the center reel
function centerReelSpin() {
    //Center Reel Section
    if (centerReel.regY <= -250 && (timesSpunCenter < spinsCenter))
        newReelCenter();
    else if (timesSpunCenter < spinsCenter)
        centerReel.regY = (centerReel.regY - 10);
    else if (timesSpunCenter == spinsCenter && (centerReel.regY > -170))
        centerReel.regY = (centerReel.regY - 10);
}

//Spin the right reel
function rightReelSpin() {
    //Center Reel Section
    if (rightReel.regY <= -250 && (timesSpunRight < spinsRight))
        newReelRight();
    else if (timesSpunRight < spinsRight)
        rightReel.regY = (rightReel.regY - 10);
    else if (timesSpunRight == spinsRight && (rightReel.regY > -170))
        rightReel.regY = (rightReel.regY - 10);
}

// Event handlers
function backgroundClicked(e) {
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

function printFunds() {
}

function backgroundOut() {
    background.alpha = 1.0;
}

function backgroundOver() {
    background.alpha = 0.5;
}

// Our Game Kicks off in here
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

    //Scale and position the center reel
    rightReel = new createjs.Bitmap("assets/images/Melon.png");
    rightReel.regX = -590;
    rightReel.regY = -100;
    rightReel.scaleX = 1.5;
    rightReel.scaleY = 1.5;

    //Add spin button
    //Add the left reel behind the background
    stage.addChild(leftReel);

    //Add the center reel behind the background
    stage.addChild(centerReel);

    //Add the center reel behind the background
    stage.addChild(rightReel);

    //Add the slot machine above the reels
    stage.addChild(background);

    background.addEventListener("click", backgroundClicked, false);
    //background.addEventListener("mouseover", backgroundOver);
    //background.addEventListener("mouseout", backgroundOut);
    // Label
    // helloText = new createjs.Text("", "40px Consolas", "#000000");
    // stage.addChild(helloText);
    // helloText.x = stage.canvas.width * 0.5;
    // helloText.y = stage.canvas.height * 0.5;
}

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

                //Add the left reel behind the background
                stage.addChild(leftReel);

                //Bring the background back to front
                stage.addChild(background);

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

                //Add the left reel behind the background
                stage.addChild(leftReel);

                //Bring the background back to front
                stage.addChild(background);

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

                //Add the left reel behind the background
                stage.addChild(leftReel);

                //Bring the background back to front
                stage.addChild(background);

                currentImageLeft = 0;
                timesSpunLeft++;
                break;
        }
    }
}

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

                //Add the left reel behind the background
                stage.addChild(centerReel);

                //Bring the background back to front
                stage.addChild(background);

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

                //Add the left reel behind the background
                stage.addChild(centerReel);

                //Bring the background back to front
                stage.addChild(background);

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

                //Add the left reel behind the background
                stage.addChild(centerReel);

                //Bring the background back to front
                stage.addChild(background);

                currentImageCenter = 0;
                timesSpunCenter++;
                break;
        }
    }
}

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

                //Add the left reel behind the background
                stage.addChild(rightReel);

                //Bring the background back to front
                stage.addChild(background);

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

                //Add the left reel behind the background
                stage.addChild(rightReel);

                //Bring the background back to front
                stage.addChild(background);

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

                //Add the left reel behind the background
                stage.addChild(rightReel);

                //Bring the background back to front
                stage.addChild(background);

                currentImageRight = 0;
                timesSpunRight++;
                break;
        }
    }
}
//# sourceMappingURL=game.js.map
