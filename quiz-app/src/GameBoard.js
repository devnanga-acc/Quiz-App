import { QuestionCard } from "./QuestionCard";
import './App.css';
import React, { useState, useEffect } from 'react'

// Need useeffect to change color asap

export function GameBoard() {

    const [question, setQuestion] = useState(0);
    

    const handleQuestion = (value) => {
        setQuestion(value);
        console.log(value);
    };

    return (
      <div className="Game-Board">
        <div className="Game-Row">
          <QuestionCard value="1" clicked={handleQuestion} />
          <QuestionCard value="2" clicked={handleQuestion} />
          <QuestionCard value="3" clicked={handleQuestion} />
          <QuestionCard value="4" clicked={handleQuestion} />
        </div>
        <div className="Game-Row">
          <QuestionCard value="5" clicked={handleQuestion}/>
          <QuestionCard value="6" clicked={handleQuestion}/>
          <QuestionCard value="7" clicked={handleQuestion}/>
          <QuestionCard value="8" clicked={handleQuestion}/>
        </div>
        <div className="Game-Row">
          <QuestionCard value="9" clicked={handleQuestion}/>
          <QuestionCard value="10" clicked={handleQuestion}/>
          <QuestionCard value="11" clicked={handleQuestion}/>
          <QuestionCard value="12" clicked={handleQuestion}/>
        </div>
        <div className="Game-Row">
          <QuestionCard value="13" clicked={handleQuestion}/>
          <QuestionCard value="14" clicked={handleQuestion}/>
          <QuestionCard value="15" clicked={handleQuestion}/>
          <QuestionCard value="16" clicked={handleQuestion}/>
        </div>
  
      </div>
    );
  };
  