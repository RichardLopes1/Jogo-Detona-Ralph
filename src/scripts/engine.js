const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),

    },
    values: {

        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
    },
    actions: {
        timeId: null,
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if (state.values.curretTime < 0) {
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        alert("Game Over! O seu resultado foi:" + state.result);
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function ramdomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let ramdomNumber = Math.floor(Math.random() * 9);
    let ramdomSquare = state.view.squares[ramdomNumber];
    ramdomSquare.classList.add("enemy");
    state.values.hitPosition = ramdomSquare.id;
}

function moveEnemy() {
    state.values.timeId = setInterval(ramdomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        })
    })
}

function initialize() {
    moveEnemy();
    addListenerHitBox();
}

initialize();