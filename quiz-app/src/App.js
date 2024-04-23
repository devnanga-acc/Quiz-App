import logo from './logo.svg';
import './App.css';
import { GameBoard } from './GameBoard';
import { useState } from 'react';


export default function App() {

  const [score, setScore] = useState(0);
  const [resetGame, setResetGame] = useState(false); 

  const updateScore = (points) => {
    setScore(score + points);
  }

  const getScoreColor = () => {
    
    if(score > 0){
      return 'green';
    }else if (score < 0){
      return 'red'
    }else 
      return 'grey';

  }

  const restartGame = () => {
    setResetGame(true);
    setScore(0);
    //setResetGame(false);
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
        <h3>
        <button
            onClick={() => restartGame()}>
           Restart
          </button>
        </h3>
        <GameBoard returnScore={updateScore}  resetGame={resetGame}/>
      </header>
    </div>
  );
}



