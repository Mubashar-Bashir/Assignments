//const inquirer = require('inquirer');
import inquirer from "inquirer";   // for Runtime input ES6
const min = 1; // range of computer genrate Number (min=1 - max=50)
const max = 50;
let answer_quit = "n";   // while user not press y to quit set n;
// randomly computer generated Number from (1-50)
const computer_gen_number = Math.floor(Math.random() * (max - min + 1)) + min;
let round=1;  // coounter for 3 rounds play chance


// function to Play Number Guessing Game;

console.log("This is a number guessing game:");
console.log(`You Have Total (3) Chance to Guess Number : Chance = ${round}`);

function playGame() {
  const range = `1-${max}`;
  console.log(`Round (${round}) Let's guess a number from: ${range}`);

  inquirer
    .prompt([
      {
        type: "input",
        name: "user_input",
        message: `Let's guess a number from: (${range})>>> : `
      }
    ])
    .then((answer: { user_input:  number}) => 
    {
        //const userGuess = parseInt(answer.user_input);
        const userGuess=answer.user_input;
      if ((userGuess) != computer_gen_number)
       {  //
            console.log("\nSorry...!!!!")
            if (userGuess< computer_gen_number) 
             {
                console.log(`Your guessed (${answer.user_input}) number is less than the computer's Magic number.`);
             } 
            else if(userGuess>computer_gen_number) 
            {
            console.log(`Your guessed (${answer.user_input}) number is greater than the computer's Magic number.`);
            }
        } 
      else 
      {
        console.log("\nCongratulation....!!!")
        console.log(`\nWow! You've correctly guessed the number: ${computer_gen_number}`);
      }
    
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'answer_quit',
            message: 'Do you want to play again? (Y/N)'
          }
        ])
        .then((answers:{answer_quit:string}) => 
        {
          const userResponse = answers.answer_quit.toLowerCase();
          
          if (userResponse === 'y') 
            {
             // User wants to play again
             console.log("You Selected = ",userResponse,' to Continue');
                round++;
                if(round<4)
                            {
                              playGame();
                            } // Recursively call playGame
                else
                {
                console.log(`You Have completed : ${round-1} Rounds Try Again:`);
                }
            }
           else if (userResponse === 'n') 
                    {
                        // User wants to quit
                        console.log("You Selected = ",userResponse,' to Quit');
                        console.log('Thank you for playing. Goodbye!');
                    } 
          else {
                    // Handle invalid input
                    console.log('Please enter "Y" for Yes or "N" for No.');
                }
        });
    })
    .catch((error1: { isTtyError: any; }) => {
      if (error1.isTtyError) 
        {
        console.log("Please check for an error:", error1);
        } 
      else 
        {
        console.log("Something else went wrong.");
        }
    });
}

playGame(); // Start the game
