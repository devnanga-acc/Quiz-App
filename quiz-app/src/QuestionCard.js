import './App.css';
import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { QuestionTimer } from './QuestionTimer';



export const QuestionCard = ( {value, clicked, question, category, choices, answer, score, passClicked, handlePassButton, resetGame} ) => {

    const [color, setColor] = useState('blue');
    const [showModal, setShowModal] = useState(false);
    const [userGuess, setUserGuess] = useState(null);
    const [alreadyOpened, setAlreadyOpened]= useState(false);

    const resetStates = () => {
        setColor('blue');
        setUserGuess(null);
        setAlreadyOpened(false);
    }

    useEffect(() => {
        if(resetGame){
            resetStates();
        }
        
    }, [resetGame]);

    const getTileColor = () => {

        if (color === 'green' || color === 'red' || color === 'grey'){
            return color;
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
            setColor('green');
            clicked(value,score,1); 
        }else{
            let tempScore = 0 - score;
            setColor('red');
            clicked(value,tempScore,0);
        } 
        closeModal();
    }

    const updateUserGuess = (choice) => {
        setUserGuess(choice);
    }
    
    Modal.setAppElement('#root');

    const handleQuestion = () => {
        setShowModal(true)
        setAlreadyOpened(true)
        console.log(answer);
      };

      const timeout = () => {
        setShowModal(false)
        let tempScore = 0 - score;
        setColor('red');
        clicked(value,tempScore,0);
      }

      const onPass = () => {
        closeModal();
        console.log("passed");
        setColor('grey');
        clicked(value,0,2); 
        handlePassButton();
      }

    return (
      <>
      <button 
      className="Question" 
      onClick={() => handleQuestion()} 
      style={{ backgroundColor: getTileColor() }}
      disabled={alreadyOpened}>{value}</button>

      <Modal className="modal-overlay-question" isOpen={showModal} >
        <div>
            <h2>{question}</h2>
            <div className='menu-items'>
                {choices.map((choice, index) => (
            <button
                className='menu-button'
                key={index}
                onClick={() => updateUserGuess(choice)}
                style={{ backgroundColor: userGuess === choice ? 'yellow' : 'white' }}>
                {choice}
            </button>
            ))}
            </div>
            
            <QuestionTimer  startTime={true} timeout={timeout}/>

            <button className="submit-button" onClick={submitAnswer}> Submit Answer</button>
            <button className='cancel-button' onClick={onPass} disabled={passClicked}> Pass </button>
        </div>
      </Modal>

      </>
    );
  };