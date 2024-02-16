const gameCanvas = document.getElementById('game');
const playerChar = document.getElementById('player');
const setEnemy = document.getElementById('enemy');
const score = document.querySelector('.score');
const hiScore = document.querySelector('.hiScore');
let scoreNum = 0;
let gameOn = false;
let enemyTypes = ['enemy1', 'enemy2', 'enemy3' , 'enemy4'];

const spawn_enemy = () => {
    let pickEnemy = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    if (gameOn == true) {
        setEnemy.classList.add(pickEnemy);
        setTimeout(function () {
            setEnemy.classList.remove(pickEnemy);
           background();
        }, 3000);
    }
};

const game_start = () => {
    if (gameOn == false) {
        console.log('Game On');
        gameOn = true;
        
    }
};

function background(){
  let image = document.createElement("img");
  let randomTree = Math.floor(Math.random()*6);
  let interval = Math.floor(Math.random()*10000);
  image.setAttribute("src",`./images/Tree${randomTree}.png`);
  image.setAttribute("class","trees") ; 
  setInterval(gameCanvas.appendChild(image), interval);
  setTimeout(function () {
    gameCanvas.removeChild(image);
}, 20100);
}


// Game over
function checkGameOver() {
    const playerAvatar = playerChar.getBoundingClientRect();
    const enemyAvatar = setEnemy.getBoundingClientRect();

    const gameOver = !(
        playerAvatar.right < enemyAvatar.left ||
        playerAvatar.left > enemyAvatar.right ||
        playerAvatar.bottom < enemyAvatar.top ||
        playerAvatar.top > enemyAvatar.bottom
    );

    let replay = null;

    if (gameOver) {
        score.innerText = '0';
        scoreNum = 0
        replay = confirm('You lost!! Do you want to replay the game?');
        gameOn = false;
        clearInterval(gameInterval);
        if (setEnemy.classList.contains("enemy1")) {
            setEnemy.classList.remove("enemy1")
        } else if (setEnemy.classList.contains("enemy2")) {
            setEnemy.classList.remove("enemy2")
        } else if (setEnemy.classList.contains("enemy3")) {
            setEnemy.classList.remove("enemy3")
        }
        startColision();
    }

    if (replay) {
        gameOn = true;
        startColision();
    }
}

const scoring = setInterval(function () {
    const enemyAvatar = setEnemy.getBoundingClientRect();
    const windowBounds = gameCanvas.getBoundingClientRect();
    if (gameOn) {
        score.innerText = scoreNum;
        if (enemyAvatar.right < windowBounds.left ){
            scoreNum++
        }
        
        if (scoreNum >= parseInt(hiScore.innerText)) {
            hiScore.innerText = scoreNum;
        }
    }
}, 100)

function startColision() {
   gameInterval = setInterval(checkGameOver, 10);
}

startColision();

const jump = () => {
    if (
        !playerChar.classList.contains('jump') &&
        !playerChar.classList.contains('duck')
    ) {
        playerChar.classList.add('jump');
        setTimeout(function () {
            playerChar.classList.remove('jump');
        }, 500);
    }
};

const duck = () => {
    if (
        !playerChar.classList.contains('duck') &&
        !playerChar.classList.contains('jump')
    ) {
        playerChar.classList.add('duck');
        setTimeout(function () {
            playerChar.classList.remove('duck');
        }, 500);
    }
};

const spawn_timer = () => {
    const min = 3001;
    const max = 5000;
    const random_time = Math.floor(Math.random() * (max - min)) + min;
    setInterval(spawn_enemy, random_time);
};

spawn_timer();

addEventListener('keydown', (event) => {
    if (
        (event.code == 'Space' && gameOn == true) ||
        (event.code == 'ArrowUp' && gameOn == true)
    ) {
        jump();
    }
});

addEventListener('keydown', (event) => {
    if (event.code == 'ArrowDown' && gameOn == true) {
        duck();
    }
});

addEventListener('keydown', (event) => {
    if (event.code == 'Space') {
        game_start();
    }
});
