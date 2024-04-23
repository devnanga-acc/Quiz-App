import './App.css';
import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'


export const QuestionCard = ( {value, clicked, question, category, choices, answer, score} ) => {

    const [color, setColor] = useState('blue');
    const [showModal, setShowModal] = useState(false);
    const [userGuess, setUserGuess] = useState(null);

    const getTileColor = (clicked) => {

        if (color === 'green'){
            return 'green';
        }else if(category === 'Sports'){
            return 'blue';
        }else if(category === 'Science'){
            return 'purple';
        }
        else if(category === 'Music'){
            return 'yellow';
        }
        else if(category === 'Nature'){
            return 'orange';
        }
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const submitAnswer = () => {
        if(userGuess === answer){
            console.log("correct");
            clicked(value,score,1); 
        }else{
            let tempScore = 0 - score;
            clicked(value,tempScore,0);
            console.log(tempScore);
            console.log("wrong");
        } 
        setShowModal(false);
    }

    const updateUserGuess = (choice) => {
        setUserGuess(choice);
    }
    
    // getTileColor();
    Modal.setAppElement('#root');

    const handleQuestion = () => {
        setColor('green');
        setShowModal(true)
        console.log(choices);
        console.log(answer);
      };

    return (
      <>
      <button 
      className="Question" 
      onClick={() => handleQuestion()} 
      style={{ backgroundColor: getTileColor() }}>{value}</button>

      <Modal isOpen={showModal}>
        <div>
            <h2>{question}</h2>
            <div>
            {choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => updateUserGuess(choice)}
            style={{ backgroundColor: userGuess === choice ? 'yellow' : 'white' }}
          >
            {choice}
          </button>
        ))}
            </div>
            
            <button onClick={submitAnswer}> Submit Answer</button>
            <button onClick={closeModal}> Close Modal</button>
        </div>
      </Modal>

      </>
    );
  };