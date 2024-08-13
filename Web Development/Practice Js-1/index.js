let btns = document.querySelectorAll(".game-container button"); // Select all buttons

let userChoice = 0;
let para = document.querySelector(".answer"); // Corrected to select the first element with class "answer"

// Function to generate a random number
function randoms() {
    let a = Math.random();
    a = Math.floor(a * 3); // Generates a number between 0 and 2
    console.log(a);
}

// Loop through the buttons and add click event listeners
for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = function() {
        if (btns[i].textContent.toLowerCase() === "rock") {
            para.textContent = "Rock";
        } else if (btns[i].textContent.toLowerCase() === "paper") {
            para.textContent = "Paper";
        } else if (btns[i].textContent.toLowerCase() === "scissor") {
            para.textContent = "Scissors"; // Corrected spelling
        }
    };
}