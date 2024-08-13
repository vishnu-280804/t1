// Select all elements with the class 'btn'
const buttons = document.querySelectorAll(".btn");
let userClicked = 0; // Initialize click count
const p = document.querySelector("#one"); // Select the first element with id 'one'

// Loop through each button and add an event listener
buttons.forEach(button => {
    button.addEventListener("click", myFunction);
});

// Define the function to be called on click
const playGame = (userChoice)=>{
    if(userChoice == "rock")
    {
        console.log("You Clicked Rock");
        }
}

const userChoice=document.querySelector("#one");

const myFunction = ()=>{
    
}