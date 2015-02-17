var canvas;
var stage: createjs.Stage;

// Game Objects 
//var helloText: createjs.Text;
var background: createjs.Bitmap;
var stageHeight;
var stageWidth;
var leftReel: createjs.Bitmap;
var currentImage = 1;
var spins;
var timesSpun;

function init() {

    timesSpun = 0;
    spins = 5;

    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);
    main();
}
 
function gameLoop() {

    //Left Reel Section
    if (leftReel.regY <= -250 && (timesSpun < spins)) 
        newReel();
        
    else if (timesSpun < spins)
        leftReel.regY = (leftReel.regY - 10);    

    else if (timesSpun == spins && (leftReel.regY > -170))
        leftReel.regY = (leftReel.regY - 10);    
    
    stage.update(); // Refreshes our stage


    //Testing
    console.log("Spins = " + spins)
    console.log("timesSpun = " + timesSpun)
}

// Event handlers
function backgroundClicked() {
   // helloText.text = "Good Bye";
   // helloText.regX = helloText.getBounds().width * 0.5;
   // helloText.regY = helloText.getBounds().height * 0.5;
    
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

    //Default REEL*********************
    //Scale and position the reels
    leftReel = new createjs.Bitmap("assets/images/Melon.png");
    leftReel.regX = -250;
    leftReel.regY = -100;
    leftReel.scaleX = 1.5;
    leftReel.scaleY = 1.5;


    
    //Add the left reel behind the background
    stage.addChild(leftReel);
    //DEFAULT REEL END *******************
    stage.addChild(background);

    //Add the slot machine above the reels
   


   // background.addEventListener("click", backgroundClicked);
    //background.addEventListener("mouseover", backgroundOver);
    //background.addEventListener("mouseout", backgroundOut);
   

   // Label
   // helloText = new createjs.Text("", "40px Consolas", "#000000");
   // stage.addChild(helloText);
   // helloText.x = stage.canvas.width * 0.5;
   // helloText.y = stage.canvas.height * 0.5;
    
}

function newReel() {
    //Clear the stage
    stage.clear();

    if (timesSpun < spins) {
        switch (currentImage) {
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

                currentImage++;
                timesSpun++;
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

                currentImage++;
                timesSpun++;
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

                currentImage = 0;
                timesSpun++;
                break;
        }
    }

}