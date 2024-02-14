const playerChar = document.getElementById("player")
let gameOn = false
let playerHeight = 0






const gameStart = () => {
    if (gameOn == false) {
        console.log("Game On")
        gameOn = true

    }
}

const goUp = () => {
    playerHeight += 1
    playerChar.innerText = `${playerHeight}`
    console.log('up 1')
}

const goDown = () => {
    playerHeight -= 1
    playerChar.innerText = `${playerHeight}`
    console.log('down 1')
}


const jump = () => {
    goUp()
    setTimeout(goUp, 1000)
    setTimeout(goUp, 1000)
    setTimeout(goUp, 1000)
    setTimeout(goDown, 1000)
    setTimeout(goDown, 1000)
    setTimeout(goDown, 1000)
    setTimeout(goDown, 1000)
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