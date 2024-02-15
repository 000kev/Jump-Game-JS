const playerChar = document.getElementById("player")
const setEnemy = document.getElementById("enemy")
const score = document.querySelector(".score")
const hiScore = document.querySelector(".hiScore")
let scoreNum = 0;
let gameOn = false
let enemyTypes = ["enemy1", "enemy2", "enemy3"]


const spawn_enemy = () => {
    let pickEnemy = enemyTypes[(Math.floor(Math.random() * (enemyTypes.length)))]
    if (gameOn == true) {
        setEnemy.classList.add(pickEnemy)
        setTimeout(function () {
            setEnemy.classList.remove(pickEnemy)
        }, 3000)
    }

}



const game_start = () => {
    if (gameOn == false) {
        console.log("Game On")
        gameOn = true

    }
}


const jump = () => {
    if (!playerChar.classList.contains("jump") && !playerChar.classList.contains("duck")) {
        playerChar.classList.add("jump")
        setTimeout(function () {
            playerChar.classList.remove("jump")
        }, 500)
    }
}

const duck = () => {
    if (!playerChar.classList.contains("duck") && !playerChar.classList.contains("jump")) {
        playerChar.classList.add("duck")
        setTimeout(function () {
            playerChar.classList.remove("duck")
        }, 500)
    }
}

const spawn_timer = () => {
    const min = 3001
    const max = 5000
    const random_time = (Math.floor(Math.random() * (max - min)) + min)
    setInterval(spawn_enemy, random_time)
}

const update = setInterval(function () {
    let playerHitBox = playerChar.getBoundingClientRect();
    let enemyHitBox = setEnemy.getBoundingClientRect();
    if (gameOn) {
        if (enemyHitBox.left < playerHitBox.right && enemyHitBox.left > playerHitBox.left && enemyHitBox.top < playerHitBox.bottom) {
            gameOver();
        } else {
            score.innerText = scoreNum;
            scoreNum++;
            if (scoreNum > parseInt(hiScore.innerText)) {
                hiScore.innerText = scoreNum;
            }
        }
    }
}, 10)

function gameOver() {
    alert("Game Over")
    gameOn = false;
    scoreNum = 0;
    score.innerText = 0;
}

spawn_timer()

addEventListener("keydown", (event) => {
    if (event.code == "Space" && gameOn == true || event.code == "ArrowUp" && gameOn == true) {
        jump()
    }
})

addEventListener("keydown", (event) => {
    if (event.code == "ArrowDown" && gameOn == true) {
        duck()
    }
})

addEventListener("keydown", (event) => {
    if (event.code == "Space") {
        game_start()
    }
})