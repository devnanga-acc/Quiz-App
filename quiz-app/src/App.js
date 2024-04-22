import logo from './logo.svg';
import './App.css';
import { GameBoard } from './GameBoard';
import { useState } from 'react';

// function QuestionCard ({value}) {
//   return (
    
//     <button className="Question">{value}</button>
    
//   );
// };


export default function App() {

  const [score, setScore] = useState(0);

  const updateScore = (points) => {
    setScore(score + points);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Welcome to My Game
        </h1>
        <h2>
          Score = {score}
        </h2>
        <GameBoard returnScore={updateScore} />
      </header>
    </div>
  );
}



