import logo from './logo.svg';
import './App.css';
import { GameBoard } from './GameBoard';
import { useEffect, useState } from 'react';
import Modal from 'react-modal'


export default function App() {

  const [score, setScore] = useState(0); //State to track score
  const [resetGame, setResetGame] = useState(false); //State to track if to reset
  const [totalOpened, setTotalOpened]= useState(0); //State to track number of tiles clicked
  const [showFinalModal, setShowFinalModal] = useState(false); //State to track if to show final message
  const [showMessage, setShowMessage] = useState(""); //State to hold message based on winning or losing

  //Keeps track of the total score
  const updateScore = (points, totalOpened) => {
    setScore(score + points);
    setTotalOpened(totalOpened);
  }

  //Need this hook to ensure the score updates fully before we display the final message
  useEffect(() => {

    //Setting fixed scores for testing purposes
    let maxScore = 200;
    let count = 15;

    if(totalOpened === count && score === maxScore){
      setShowMessage("Congratulations, perfect game")
      setShowFinalModal(true);

    }else if (totalOpened === count && score !== maxScore){
      setShowMessage("You Can Do Better")
      setShowFinalModal(true)
    }

  }, [score])

  //Based on the user's score we set the color
  const getScoreColor = () => {
    
    if(score > 0){
      return 'green';
    }else if (score < 0){
      return 'red'
    }else 
      return 'grey';

  }

  //Helper function to restart the entire game and pass the messages down to children
  const restartGame = () => {
    setScore(0); 
    setShowFinalModal(false);
    setResetGame(true);
  }

  //Set the Reset Flag back to false
  const postResetGame = () => {
      setResetGame(false);
      
  }

  //Main component
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Welcome to My Game
        </h1>
        <h2 style={{ color: getScoreColor() }}>
          Score = {score}
        </h2>
        <p>
        <button
            className='Restart-Button'
            onClick={() => restartGame()}>
           Restart
          </button>
        </p>
        <div className='Main-Container'>
          <div className='Game-Board'>
            <GameBoard returnScore={updateScore}  resetGame={resetGame} postResetGame={postResetGame}/>
          </div>
          <div className='Legend'>
              Legend
              <ul>
                <li><span className="square" style={{backgroundColor:'blue', color: 'blue' }}></span>Sports</li>
                <li><span className="square" style={{backgroundColor:'purple', color: 'purple' }}></span>Science</li>
                <li><span className="square" style={{backgroundColor:'yellow', color: 'yellow' }}></span>Music</li>
                <li><span className="square" style={{backgroundColor:'orange', color: 'orange' }}></span>Nature</li>
                <li><span className="square" style={{backgroundColor:'green', color: 'green' }}></span>Correct</li>
                <li><span className="square" style={{backgroundColor:'red', color: 'red' }}></span>Incorrect</li>
                <li><span className="square" style={{backgroundColor:'grey', color: 'grey' }}></span>Passed</li>
              </ul>
          </div>
        </div>
        
      </header>

    <Modal isOpen={showFinalModal} className="modal-overlay">
            <div className="modal-content">
                <p className="modal-message">{showMessage}</p>
                <button className="modal-button" onClick={restartGame}>New Game</button>
            </div>
    </Modal>
  
    </div>
  );
}



