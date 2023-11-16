const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values: {
        gameInitialVelocity: 1000,
        velocityDecrem: 50,
        hitPosition: 0,
        result: 0,
        currentTime: 60
    },
    actions: {
        countDownTimerId: setInterval(countDown, 1000)
    }
}
let gameVelocity = state.values.gameInitialVelocity

function playSound() {
    let audio = new Audio("./src/assets/audio/get.wav")
    audio.volume = 0.2
    audio.playbackRate = 2
    audio.play()
}


function countDown() {
    state.values.currentTime--
    state.view.timeLeft.textContent = state.values.currentTime
    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.values.timerId)
        alert("Game Over! Your score is " + state.values.result)
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    })
    let randomNumber = Math.floor(Math.random() * 9)
    let randomSquare = state.view.squares[randomNumber]

    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, gameVelocity)
}

function addListenerHitBox() {
    moveEnemy()
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                playSound()
                state.values.result++
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null
                gameVelocity -= state.values.velocityDecrem
                clearInterval(state.values.timerId);
                moveEnemy()
            }
        })
    })
}

function initialize() {
    addListenerHitBox()
}

initialize()