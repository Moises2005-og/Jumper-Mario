const gameBoard = document.querySelector(".game-board")
const mario = document.querySelector(".mario")
const pipe = document.querySelector(".pipe")
const clouds = document.querySelector(".clouds")
const titulo = document.getElementById("titulo")
const menu = document.querySelector(".menu")
const voltar = document.querySelector(".back")
const restart = document.querySelector(".restart")
const scorer = document.querySelector(".scorer-text")
const audioJump = new Audio("audio/cartoon-jump-6462 (mp3cut.net).mp3")
const audioDeath = new Audio("audio/death.mp3")
const audioOst = new Audio("audio/SuperMarioBros (mp3cut.net).mp3")
audioOst.loop = true  
let isGamerunning = false

window.document.addEventListener("keydown", function(event) {
    let tecla = event.key 
    if(tecla == " ") {
        audioJump.play()
        mario.classList.add("jump")
    }

    setTimeout(function() {
        mario.classList.remove("jump")
    }, 500)
})

function checkCollision() {
    let marioPosition = mario.getBoundingClientRect()
    let pipePosition = pipe.getBoundingClientRect()

    return !(
        marioPosition.top > pipePosition.bottom ||
        marioPosition.bottom < pipePosition.top ||
        marioPosition.right < pipePosition.left ||
        marioPosition.left > pipePosition.right ||
        marioPosition.left > pipePosition.left
    )
}

let scoreInterval
const startScore = () => {
    let score = 0

    scoreInterval = setInterval(function() {
        score += 10
        scorer.textContent = `Score: ${score}`
    }, 500)
}

const stopScorer = () => {
    clearInterval(scoreInterval)
}

let intervalId;
titulo.addEventListener("click", () => {
    isGameRunning = true
    audioOst.play()
    menu.classList.add("hidden-menu")
    gameBoard.classList.remove("hidden-board")
    startScore()

    intervalId = setInterval(function() {
        if (!isGameRunning) return; 

        if (checkCollision()) {
            const marioPosition = mario.getBoundingClientRect()
            const pipePosition = pipe.getBoundingClientRect()
            const cloudsPosition = clouds.getBoundingClientRect()
            const gameBoard = document.querySelector(".game-board").getBoundingClientRect()
            let newPipePosition = gameBoard.right - pipePosition.right
            let newMarioPosition = gameBoard.right - marioPosition.right
            let newCloudsposition = gameBoard.right - cloudsPosition.right

            mario.src = "imagens/game-over.png"
            mario.style.width = "70px"
            pipe.style.right = `${newPipePosition}px`
            mario.style.right = `${newMarioPosition}px`
            clouds.style.right = `${newCloudsposition}px`
            pipe.style.animation = "none"
            clouds.style.animation = "none"
            

            if (mario.src.includes("game-over.png")) {
                audioOst.pause()
                audioDeath.play()
                stopScorer()
            }

            clearInterval(intervalId)
            isGamerunning = false
            voltar.classList.remove("hidden-menu")
        }
    }, 100);
});

restart.addEventListener("click", () => {
    voltar.classList.add("hidden-menu")
    gameBoard.classList.add("hidden-board")
    menu.classList.remove("hidden-menu")
    mario.src = "imagens/mario.gif"
    mario.style.width = "130px"
    audioOst.currentTime = 0
    clouds.style.animation = ""
    pipe.style.animation = ""
})