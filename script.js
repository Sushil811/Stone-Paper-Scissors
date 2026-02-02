// Init Scores
let userScore = parseInt(localStorage.getItem("userScore")) || 0;
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

// Load scores on start
updateScoreBoard();

const choices = ["rock", "paper", "scissors"];

function playGame(userChoice) {
    const pcChoice = choices[Math.floor(Math.random() * 3)];
    
    document.getElementById("game-board").classList.add("hidden");
    document.getElementById("results-board").classList.remove("hidden");

    displaySelection("user-pick-img", userChoice);
    displaySelection("pc-pick-img", pcChoice);

    const winner = getWinner(userChoice, pcChoice);
    const resultTitle = document.getElementById("winner-text");
    const subText = document.getElementById("sub-text");
    const nextBtn = document.getElementById("next-btn");
    
    const userWrapper = document.getElementById("user-pick-wrapper");
    const pcWrapper = document.getElementById("pc-pick-wrapper");

    // Reset styles
    userWrapper.classList.remove("winner-animation");
    pcWrapper.classList.remove("winner-animation");
    nextBtn.classList.add("hidden");
    subText.innerText = "AGAINST PC";

    if (winner === "user") {
        resultTitle.innerText = "YOU WIN";
        userScore++;
        localStorage.setItem("userScore", userScore);
        userWrapper.classList.add("winner-animation");
        nextBtn.classList.remove("hidden"); // Show Next button only on win
    } else if (winner === "pc") {
        resultTitle.innerText = "YOU LOST";
        computerScore++;
        localStorage.setItem("computerScore", computerScore);
        pcWrapper.classList.add("winner-animation");
    } else {
        resultTitle.innerText = "TIE UP";
        subText.innerText = "";
    }

    updateScoreBoard();
}

function getWinner(user, pc) {
    if (user === pc) return "tie";
    if (
        (user === "rock" && pc === "scissors") ||
        (user === "paper" && pc === "rock") ||
        (user === "scissors" && pc === "paper")
    ) {
        return "user";
    }
    return "pc";
}

function displaySelection(elementId, choice) {
    const el = document.getElementById(elementId);
    el.classList.remove("rock-border", "paper-border", "scissors-border");
    el.classList.add(`${choice}-border`);
    el.innerHTML = `<img src="./assets/${choice}.png" alt="${choice}">`;
}

function updateScoreBoard() {
    document.getElementById("user-score").innerText = userScore;
    document.getElementById("computer-score").innerText = computerScore;
}

// --- UPDATED FUNCTIONS FOR VISIBILITY ---

function resetGame() {
    // Show Scoreboard
    document.querySelector(".scoreboard").classList.remove("hidden");
    
    // Show Game Board
    document.getElementById("game-board").classList.remove("hidden");
    
    // Hide Results & Hurray
    document.getElementById("results-board").classList.add("hidden");
    document.getElementById("hurray-board").classList.add("hidden");
    document.getElementById("next-btn").classList.add("hidden"); 
}

function showHurrayPage() {
    // Hide Scoreboard
    document.querySelector(".scoreboard").classList.add("hidden");
    
    // Hide Results
    document.getElementById("results-board").classList.add("hidden");
    
    // Show Hurray Section
    document.getElementById("hurray-board").classList.remove("hidden");
    
    // Hide Next Button (Rules button remains visible via CSS)
    document.getElementById("next-btn").classList.add("hidden"); 
}

function toggleRules() {
    const modal = document.getElementById("rules-modal");
    modal.classList.toggle("hidden");
}
