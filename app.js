document.getElementById("start-btn").addEventListener("click", function () {
    document.getElementById("instructions-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
});

let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Start the game on keypress
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game has started");
        started = true;
        levelUp();
    }
});

// Flash animation for game-generated sequence
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// Flash animation for user clicks
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4); // FIXED: should be 4, not 3
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log("Game sequence: ", gameSeq);
    gameFlash(randBtn);
}

// Properly defined checkAns function
function checkAns(idx) {
    highScore = level;
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your Score is <b>${level-1}</b><br>Press any key to restart.`;
        document.body.style.backgroundColor = "red";
        setTimeout(function () {
            document.body.style.backgroundColor = "white";
        }, 150);
        reset();
    }
    document.getElementById("high-score").innerText = `Highest Score: ${highScore}`;

}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}