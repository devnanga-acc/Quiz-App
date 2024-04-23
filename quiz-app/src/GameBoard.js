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
       // for (let item of selectedQuestions){
            gameQuestions.push(selectedQuestions);
        //}
        
    }

}
generateQuestionList();   

export function GameBoard( {returnScore} ) {

    //This holds the value of the current question, number of points received as well as the status to update color of scoreboard
    const handleQuestion = (value,score,correct) => {
        //setQuestion(value);
        returnScore(score, correct);
    };

    // if(resetGame){
    //     gameQuestions = [];
    //     generateQuestionList();
    //     console.log(gameQuestions);
    //     resetGame();
    // }
      

    //console.log(resetGame);

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
                />
            ))}
            </div>
        ))}
  
      </div>
    );
  };
  