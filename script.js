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
    playerChar.classList.add("jump")
    setTimeout(function(){
        playerChar.classList.remove("jump")
        }, 500)
}



addEventListener("keydown", (event) => {
    if (event.code == "Space"  && gameOn == true || event.code == "ArrowUp"  && gameOn == true) {
        jump()
    }
})

addEventListener("keydown", (event) => {
    if (event.code == "Space" ) {
        gameStart()
    }
})