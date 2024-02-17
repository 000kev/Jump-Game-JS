const high_score = document.getElementById("score");
const board = document.getElementById("board");
const context = board.getContext("2d");

const BOARD_WIDTH = 750;
const BOARD_HEIGHT = 250;

let SPEED = 1;

let playerWidth = 50;
let playerHeight = 90;
let playerX = 50;
let playerY = BOARD_HEIGHT - playerHeight;
let playerImg;

let player = {
    x: playerX,
    y: playerY,
    width: playerWidth,
    height: playerHeight
}

// obstacles
const obstacles = [];

let obstacle1Width = 50;
let obstacle2Width = 76;
let obstacle3Width = 57;
let obstacleHeight = 50;
let obstacleX = 700;
let obstacleY = BOARD_HEIGHT - obstacleHeight;

let obstacle1Img;
let obstacle2Img;
let obstacle3Img;
let obstacle4Img;

// game physics
let velocityX = -8; // obstacle moving speed
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;

window.onload = () => {
    
    board.height = BOARD_HEIGHT;
    board.width = BOARD_WIDTH;

    
    playerImg = new Image();
    playerImg.src = "./images/player-idle.png";
    playerImg.onload = () => {
        context.drawImage(playerImg, player.x, player.y, player.width, player.height);
    }
    obstacle1Img = new Image();
    obstacle2Img = new Image();
    obstacle3Img = new Image();

    obstacle1Img.src = './images/slime.png';
    obstacle2Img.src = './images/ghost.png';
    obstacle3Img.src = './images/skull.png';


    requestAnimationFrame(update);
    setInterval(placeObstacle, 1000);
    setInterval(() => {
        SPEED = SPEED * 1.1;
    }, 5000)

    document.addEventListener("keydown", controlPlayer);
}

const update = () => {
    requestAnimationFrame(update);
    if (gameOver) return;

    context.clearRect(0, 0, board.width, board.height); // refreshing the page after each obstacle

    //player
    velocityY+=gravity;
    player.y = Math.min(player.y + velocityY, playerY); // gravity calculation
    if (player.y === playerY) playerImg.src = "./images/player-idle.png";
    context.drawImage(playerImg, player.x, player.y, player.width, player.height);

    //obstacles
    for (let i = 0; i < obstacles.length; i++) {
        let obstacle = obstacles[i];
        obstacle.x+=velocityX * SPEED;
        context.drawImage(obstacle.img, obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        if (detectCollision(player, obstacle)) {
            if (parseInt(high_score.innerText) < score+1) high_score.innerText = score+1;
            gameOver = true;
            // playerImg.src = "dead";
            playerImg.onload = () => {
                context.drawImage(playerImg, player.x, player.y, player.width, player.height);
            }
        }
    }
    keepScore();
    //scoring
}

const keepScore = () => {
    context.fillStyle="black";
    context.font="20px courier";
    score++;
    context.fillText(score, 5, 20);
}

const controlPlayer = (e) => {
    if (gameOver) return;
    
    // jump
    if ((e.code == "Space" || e.code =="ArrowUp") && player.y == playerY) {
        velocityY = -10;
        playerImg.src = "./images/player-jump.png";
    }
    // duck
}

const placeObstacle = () => {
    if (gameOver) return;
    let obstacle = {
        img: null,
        x: obstacleX,
        y: obstacleY,
        width: null,
        height: obstacleHeight
    };
    let placeRandom = Math.random();

    if (placeRandom > 0.9) {
        obstacle.img = obstacle1Img;
        obstacle.width = obstacle1Width;
        obstacles.push(obstacle);
    } else if (placeRandom > 0.6) {
        obstacle.img = obstacle2Img;
        obstacle.width = obstacle2Width;
        obstacles.push(obstacle);
    } else if (placeRandom > 0.3) {
        obstacle.img = obstacle3Img;
        obstacle.width = obstacle3Width;
        obstacles.push(obstacle);
    }

    if (obstacles.length > 5) {
        obstacles.shift(); // keep the array from growing too much
    }
}


const detectCollision = (obj1, obj2) => {
    return obj2.x <= obj1.x + obj1.width -10 &&
    obj1.x <= obj2.x + obj2.width -10 &&
    obj1.y <= obj2.y + obj2.height &&
     obj2.y <= obj1.y + obj1.height;
}