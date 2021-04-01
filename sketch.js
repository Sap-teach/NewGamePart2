var PLAY = 1;
var END = 0;
var gameState = 1;
var submarine, submarineImage;
var gameOverImage, gameOver;
var jewel1, jewel1image, jewel2, jewel2image, jewel3, jewel3image, jewel4, jewel4image;
//var survivalTime = 0;
var jewelCollected = 0;
var invisibleGround;
var bg0, backgroundImg;
var Torpedoes = 5;
var Ammo = 100;
var torpedo, torpedoImg;
var fish1, fish2, fish3, fish4, fish5, fish6, fish7, fish8, fish9, fish10, fish11, fish12, fish13;
var diverSurprise, treasureSurprise;
var errorSound;
var bulletShoot, bulletShootImage;

function preload() {
    backgroundImg = loadImage("seaBackground4x.jpg");
    submarineImage = loadImage("submarine(1).png");
    torpedoImg = loadImage("torpedoSubmarine.png");
    errorSound = loadSound("error_sound.mp3")
    bulletShootImage = loadImage("bulletAnimation-remove.png")
}



function setup() {
    createCanvas(5800, 2500);

    //for background
    bg0 = createSprite(1900, 700, 600, 600);
    bg0.addImage("bg0", backgroundImg);
    //bg0.scale = 2.5;
    bg0.velocityX = -15

    //for submarine
    submarine = createSprite(1250, 660, 20, 20);
    submarine.addImage(submarineImage);
    submarine.scale = 2.5;

    //for reducing collision radius
    submarine.setCollider("rectangle", 0, -10, 500, 80)
        //submarine.debug = true;

    //for invisibleBedrock
    invisibleGround = createSprite(2250, 2050, 4500, 10)
    invisibleGround.visible = false;

    //for groups
    jewel1group = new Group();
    jewel2group = new Group();
    jewel3group = new Group();
    jewel4group = new Group();
    torpedoGroup = new Group();
    torpedoRefuelGroup = new Group();
    fish1Group = new Group();
    fish2Group = new Group();
    fish3Group = new Group();
    fish4Group = new Group();
    fish5Group = new Group();
    fish6Group = new Group();
    fish7Group = new Group();
    fish8Group = new Group();
    fish9Group = new Group();
    fish10Group = new Group();
    fish11Group = new Group();
    fish12Group = new Group();
    fish13Group = new Group();
    bulletShootGroup = new Group();

}


function draw() {
    background(0);

    //for background
    if (bg0.x < 0) {
        bg0.x = bg0.width / 2;
    }

    //for submarine movement
    //for movement
    if (keyDown("d") && submarine.x < 1600 || keyDown(RIGHT_ARROW) && submarine.x < 1600) {
        submarine.x = submarine.x + 10;
    }

    if (keyDown("a") && submarine.x > 620 || keyDown(LEFT_ARROW) && submarine.x > 620) {
        submarine.x = submarine.x - 10;
    }
    if (keyDown("w") && submarine.y > 200 || keyDown(UP_ARROW) && submarine.y > 200) {
        submarine.y = submarine.y - 10;
    }
    if (keyDown("s") && submarine.y < 2050 || keyDown(DOWN_ARROW) && submarine.y < 2050) {
        submarine.y = submarine.y + 10;
    }
    //for collison of monkey
    submarine.collide(invisibleGround)

    //for shooting torpedo
    if (keyWentDown("space") && Torpedoes > 0) {
        shootTorpedo();
        Torpedoes = Torpedoes - 1
    }

    if (keyWentDown("space") && Torpedoes < 1) {
        errorSound.play();
    }


    //for shooting bullet
    if (mouseWentDown("leftButton") && Ammo > 0) {
        shootBullet();
        Ammo = Ammo - 1
    }

    if (mouseWentDown("leftButton") && Ammo < 1) {
        errorSound.play();
    }

    drawSprites();
    //for torpedoes
    stroke(0);
    textSize(100);
    fill(240, 72, 119);
    text("Torpedoes Left: " + Torpedoes, 10, 100);

    //for bulletsAMMO
    stroke(0);
    textSize(75);
    fill(240, 72, 119);
    text("Bullets Left: " + Ammo, 10, 200);

    //for info
    if (frameCount < 300) {
        stroke(255);
        textSize(75);
        fill(207, 157, 23);
        text("PRESS SPACE FOR TORPEDOES AND LEFT MOUSE BUTTON FOR BULLETS ", 2000, 100);

    }
}

//for shoot torpedo

function shootTorpedo() {
    torpedo = createSprite(440, 200, 50, 5);
    torpedo.addImage(torpedoImg);
    //torpedo.scale = 0.356778;
    torpedo.velocityX = 30;
    torpedo.y = submarine.y;
    torpedo.x = submarine.x + 100
    torpedo.lifetime = 195;
    torpedoGroup.add(torpedo);
}

//for shoot bullet

function shootBullet() {
    bulletShoot = createSprite(440, 200, 50, 5);
    bulletShoot.addImage(bulletShootImage);
    bulletShoot.scale = 1;
    bulletShoot.velocityX = 70;
    bulletShoot.y = submarine.y;
    bulletShoot.x = submarine.x + 100
    bulletShoot.lifetime = 100;
    bulletShootGroup.add(bulletShoot);
}