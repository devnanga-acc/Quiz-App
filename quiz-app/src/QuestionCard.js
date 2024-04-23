import './App.css';
import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { QuestionTimer } from './QuestionTimer';

//value contains the name of the question
//clicked is used to pass data to the gameboard parent
//question hold the actual question
//category hold the category used to set color
//choices has an array of the questions
//answer holds the corect answer
//score holds the score
//passClicked is used to check if the pass button is available or not
//handlePassButton is used to update the flag
//resetGame is used to handle clearing of the children

export const QuestionCard = ( {value, clicked, question, category, choices, answer, score, passClicked, handlePassButton, resetGame} ) => {

    const [color, setColor] = useState('blue'); //sets color based on category
    const [showModal, setShowModal] = useState(false);//shows the question
    const [userGuess, setUserGuess] = useState(null);//records user guess
    const [alreadyOpened, setAlreadyOpened]= useState(false);//used to ensure each question can only be opened once

    //reset to clear child components
    const resetStates = () => {
        setColor('blue');
        setUserGuess(null);
        setAlreadyOpened(false);
    }

    //calling in a use effect block to prevent re renders
    useEffect(() => {
        if(resetGame){
            resetStates();
        }
        
    }, [resetGame]);

    //sets color
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

    //used to close the question modal
    const closeModal = () => {
        setShowModal(false);
    }

    //used to check if the user's guess is correct
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

    //Allowing the user to hover the options and use a button to select one
    const updateUserGuess = (choice) => {
        setUserGuess(choice);
    }
    
    Modal.setAppElement('#root');

    //This loads the modal when a user clicks on a tile
    const handleQuestion = () => {
        setShowModal(true)
        setAlreadyOpened(true)
        console.log(answer);
      };

      //This case happens when user runs out of time
      const timeout = () => {
        setShowModal(false)
        let tempScore = 0 - score;
        setColor('red');
        clicked(value,tempScore,0);
      }

      //Case when the user passes
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