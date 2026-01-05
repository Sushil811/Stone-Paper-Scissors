const choices = ["rock", "paper", "scissors"];
let userScore = parseInt(localStorage.getItem("userScore")) || 0;
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

updateScoreBoard();

function playGame(userChoice) {
    const pcChoice = choices[Math.floor(Math.random() * 3)];
    
    document.getElementById("game-board").classList.add("hidden");
    document.getElementById("results-board").classList.remove("hidden");

    displaySelection("user-pick-img", userChoice);
    displaySelection("pc-pick-img", pcChoice);

    const winner = getWinner(userChoice, pcChoice);
    const resultText = document.getElementById("winner-text");
    const nextBtn = document.getElementById("next-btn");
    const userImgWrapper = document.getElementById("user-pick-img");
    const pcImgWrapper = document.getElementById("pc-pick-img");

    // Clear previous animations
    userImgWrapper.parentElement.classList.remove("winner-animation");
    pcImgWrapper.parentElement.classList.remove("winner-animation");
    nextBtn.classList.add("hidden");

    if (winner === "user") {
        resultText.innerText = "YOU WIN";
        userScore++;
        localStorage.setItem("userScore", userScore);
        // Apply animation to the user's circle
        userImgWrapper.classList.add("winner-animation");
        nextBtn.classList.remove("hidden");
    } else if (winner === "pc") {
        resultText.innerText = "YOU LOST";
        computerScore++;
        localStorage.setItem("computerScore", computerScore);
        pcImgWrapper.classList.add("winner-animation");
    } else {
        resultText.innerText = "TIE UP";
    }
    updateScoreBoard();
}

function getWinner(user, pc) {
    if (user === pc) return "tie";
    if ((user === "rock" && pc === "scissors") || 
        (user === "paper" && pc === "rock") || 
        (user === "scissors" && pc === "paper")) {
        return "user";
    }
    return "pc";
}

function updateScoreBoard() {
    document.getElementById("user-score").innerText = userScore;
    document.getElementById("computer-score").innerText = computerScore;
}

function displaySelection(elementId, choice) {
    const el = document.getElementById(elementId);
    // Reuse the same classes for borders
    el.className = `circle ${choice}-border`;
    el.innerHTML = `<img src="./assets/${choice}.png" alt="${choice}">`;
}

function resetGame() {
    document.getElementById("game-board").classList.remove("hidden");
    document.getElementById("results-board").classList.add("hidden");
    document.getElementById("hurray-board").classList.add("hidden");
    document.getElementById("next-btn").classList.add("hidden");
}

function showHurray() {
    document.getElementById("results-board").classList.add("hidden");
    document.getElementById("hurray-board").classList.remove("hidden");
    document.getElementById("next-btn").classList.add("hidden");
}

function toggleRules() {
    document.getElementById("rules-modal").classList.toggle("hidden");
}