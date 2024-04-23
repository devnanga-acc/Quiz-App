import { QuestionCard } from "./QuestionCard";
import './App.css';
import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { allQuestions } from './allQuestions';

// Need useeffect to change color asap
let gameQuestions = [];

const generateQuestionList = () => {

    let categories = ["Sports", "Science", "Music", "Nature"].sort(() => Math.random() - 0.5);
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

export function GameBoard( {returnScore, resetGame} ) {

    const [passButton, setPassButton]= useState(false);
    const [displayResult, setDisplayresult] = useState(false);
    const [showMessage, setShowMessage] = useState("");
    const [timeoutInterval, setTimeoutInterval] = useState(null);

    const resetStates = () => {
        setPassButton(false); 
        setDisplayresult(false);
        setShowMessage(false);
    }


    console.log(resetGame)
    if(resetGame){
        gameQuestions = [];
        generateQuestionList();
        console.log(gameQuestions);
        resetStates();
        // setPassButton(false); 
        // setDisplayresult(false);
        // setShowMessage(false);
    }

    
    //This holds the value of the current question, number of points received as well as the status to update color of scoreboard
    const handleQuestion = (value,score,correct) => {
        returnScore(score, correct);
        returnMessage(score,correct);
        setTimeout(() => {
            toggleResult();
        }, 5000);
    };

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
        console.log(message)
        setShowMessage(message)
        setDisplayresult(true)
    }

    const toggleResult = () => {
        clearTimeout(timeoutInterval);
        setDisplayresult(false);
    }

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
  