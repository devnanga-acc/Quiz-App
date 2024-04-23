import logo from './logo.svg';
import './App.css';
import { GameBoard } from './GameBoard';
import { useEffect, useState } from 'react';
import Modal from 'react-modal'


export default function App() {

  const [score, setScore] = useState(0);
  const [resetGame, setResetGame] = useState(false); 
  const [totalOpened, setTotalOpened]= useState(0);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [showMessage, setShowMessage] = useState("");

  const updateScore = (points, totalOpened) => {
    setScore(score + points);
    setTotalOpened(totalOpened);
  }

  useEffect(() => {
    // console.log(totalOpened)
    // console.log(score);
    // let maxScore = 50;
    // let count = 3;
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

  const getScoreColor = () => {
    
    if(score > 0){
      return 'green';
    }else if (score < 0){
      return 'red'
    }else 
      return 'grey';

  }

  const restartGame = () => {
    setScore(0); 
    setShowFinalModal(false);
    setResetGame(true);
  }

  const postResetGame = () => {
      setResetGame(false);
      
  }

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



