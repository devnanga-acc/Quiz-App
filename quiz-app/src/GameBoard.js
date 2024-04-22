import { QuestionCard } from "./QuestionCard";
import { QuestionList } from "./QuestionList";
import './App.css';
import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'

// Need useeffect to change color asap

export function GameBoard( {returnScore} ) {

    Modal.setAppElement('#root');
    const [question, setQuestion] = useState(0);
    

    const handleQuestion = (value) => {
        setQuestion(value);
        console.log(value);
        returnScore(5);
    };

    return (
      <div className="Game-Board">
        <Modal isOpen={question !== 0}>
        <QuestionList/>
        <button onClick={() => setQuestion(0)}>Close Modal</button>
        </Modal>

        <div className="Game-Row">
          <QuestionCard value="Question 1" clicked={handleQuestion} />
          <QuestionCard value="Question 2" clicked={handleQuestion} />
          <QuestionCard value="Question 3" clicked={handleQuestion} />
          <QuestionCard value="Question 4" clicked={handleQuestion} />
        </div>
        <div className="Game-Row">
          <QuestionCard value="Question 5" clicked={handleQuestion}/>
          <QuestionCard value="Question 6" clicked={handleQuestion}/>
          <QuestionCard value="Question 7" clicked={handleQuestion}/>
          <QuestionCard value="Question 8" clicked={handleQuestion}/>
        </div>
        <div className="Game-Row">
          <QuestionCard value="Question 9" clicked={handleQuestion}/>
          <QuestionCard value="Question 10" clicked={handleQuestion}/>
          <QuestionCard value="Question 11" clicked={handleQuestion}/>
          <QuestionCard value="Question 12" clicked={handleQuestion}/>
        </div>
        <div className="Game-Row">
          <QuestionCard value="Question 13" clicked={handleQuestion}/>
          <QuestionCard value="Question 14" clicked={handleQuestion}/>
          <QuestionCard value="Question 15" clicked={handleQuestion}/>
          <QuestionCard value="Question 16" clicked={handleQuestion}/>
        </div>
  
      </div>
    );
  };
  