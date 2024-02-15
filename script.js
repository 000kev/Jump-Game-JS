const playerChar = document.getElementById("player")
let gameOn = false
let playerHeight = 0
let Enemy = (1,2,3)






const gameStart = () => {
    if (gameOn == false) {
        console.log("Game On")
        gameOn = true

    }
}


const jump = () => {
    if (!playerChar.classList.contains("jump") && !playerChar.classList.contains("duck")){
        playerChar.classList.add("jump")
        setTimeout(function(){
            playerChar.classList.remove("jump")
            }, 500)
    }
}

const duck = () => {
    if (!playerChar.classList.contains("duck") && !playerChar.classList.contains("jump")){
        playerChar.classList.add("duck")
        setTimeout(function(){
            playerChar.classList.remove("duck")
            }, 500)
    }
}



addEventListener("keydown", (event) => {
    if (event.code == "Space"  && gameOn == true || event.code == "ArrowUp"  && gameOn == true) {
        jump()
    }
})

addEventListener("keydown", (event) => {
    if (event.code == "ArrowDown" && gameOn == true) {
        duck()
    }
})

addEventListener("keydown", (event) => {
    if (event.code == "Space" ) {
        gameStart()
    }
})