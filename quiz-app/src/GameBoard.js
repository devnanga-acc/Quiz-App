import { QuestionCard } from "./QuestionCard";
import './App.css';
import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { allQuestions } from './allQuestions';

// Holds the main game array of questions
let gameQuestions = [];

//Used to generate new questions if the reset button is clicked
//Works by taking 4 questions from each category and assigning them points from 5 to 20
const generateQuestionList = () => {

    let categories = ["Sports", "Science", "Music", "Nature"].sort(() => Math.random() - 0.5);
    //let categories = ["Sports"]
    for (let category of categories){
        const filteredQuestions = allQuestions.filter(question => question.category === category);
        const shuffledQuestions = filteredQuestions.sort(() => Math.random() - 0.5);
        const selectedQuestions = shuffledQuestions.slice(0, 4);
        selectedQuestions[0].score = 5;
        selectedQuestions[1].score = 10;
        selectedQuestions[2].score = 15;
        selectedQuestions[3].score = 20;
        gameQuestions.push(selectedQuestions);      
    }
}
generateQuestionList();   

//returnScore is used to pass the score to the main component
//resetGame is used to accept the flag from the parent and this will be used to reset states in the children as well
//postResetGame is used to pass a message that the game is reset to the parent so it can reset the flag
export function GameBoard( {returnScore, resetGame, postResetGame} ) {


    const [passButton, setPassButton]= useState(false); //Tracks state of the 1 use pass button
    const [displayResult, setDisplayresult] = useState(false); //Dispays if the user got the question correct or wrong
    const [showMessage, setShowMessage] = useState(""); //Holds the acual message
    const [timeoutInterval, setTimeoutInterval] = useState(null); //Used to set a timeout of the result box

    const [totalOpened, setOpened] = useState(0); //Used to pass the count of tiles clicked back to parent

    //Called when a user clicks on a new tile to update count
    const addCount = () => {
        setOpened(prev => prev + 1);
    }

    //Used to reset all children components 
    const resetStates = () => {
        setPassButton(false); 
        setDisplayresult(false);
        setShowMessage(false);
        setOpened(0);
    }

    //Need to run this in a use effect block to prevent many re renders
    useEffect(() => {
        if(resetGame){
            gameQuestions = [];
            generateQuestionList();
            resetStates();
            postResetGame();
        }
    }, [resetGame]);

    
    //This holds the value of the current question, number of points received as well as the status to update color of scoreboard
    const handleQuestion = (value,score,correct) => {
        addCount();
        returnScore(score, totalOpened, correct);
        returnMessage(score,correct);
        
        //This block of code is used to display the result for only up to 5 seconds
        setTimeout(() => {
            toggleResult();
        }, 5000);
    };

    //This gives the user an update on his answer
    const returnMessage = (score,correct) => {
        let message;
        if (correct === 0){
            let tempScore = Math.abs(score);
            message = "You got the question wrong and lost " + tempScore + " Points";
        }else if (correct === 1){
            message = "You got the question correct and won " + score + " Points";
        }else if (correct === 2 ){
            message = "You passed the question";
        }
        setShowMessage(message)
        setDisplayresult(true)
    }

    //This is used to determine when to display the result or not
    const toggleResult = () => {
        clearTimeout(timeoutInterval);
        setDisplayresult(false);
    }

    //This is used to ensure the pass button is only clicked once acrross all states
    const handlePassButton = () => {
        if(!passButton)
            setPassButton(true);
    }


    return (
      <div className="Game-Board">

        {gameQuestions.map((row, rowIndex) => (
            <div className="Game-Row" key={rowIndex}>
            {row.map((question, i) => (
                <QuestionCard
               
                key={i}
                value={`Question ${i + 1}\nScore: ${question.score} `}
                clicked={handleQuestion}
                question={question.question}
                category={question.category}
                choices={question.answers}
                answer={question.correct}
                score={question.score}
                passClicked={passButton}
                handlePassButton={handlePassButton}
                resetGame={resetGame}
                />
            ))}
            </div>
        ))}

    <Modal isOpen={displayResult} className="modal-overlay">
            <div className="modal-content">
                <p className="modal-message">{showMessage}</p>
                <button className="modal-button" onClick={toggleResult}>Continue</button>
            </div>
    </Modal>
  
      </div>
    );
  };
  