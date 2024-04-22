import './App.css';
import React, { useState, useEffect } from 'react'


export const QuestionCard = ( {value, clicked, question} ) => {

    const [color, setColor] = useState('blue');
    const handleQuestion = () => {
        setColor('green');
        clicked(value); 
      };

    return (
      
      <button 
      className="Question" 
      onClick={() => handleQuestion()} 
      style={{ backgroundColor: color }}>{value}</button>
      
    );
  };