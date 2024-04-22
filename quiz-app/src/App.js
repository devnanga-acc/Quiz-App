import logo from './logo.svg';
import './App.css';
import { GameBoard } from './GameBoard';

// function QuestionCard ({value}) {
//   return (
    
//     <button className="Question">{value}</button>
    
//   );
// };

// function GameBoard() {
//   return (
//     <div className="Game-Board">
//       <div className="Game-Row">
//         <QuestionCard value="1"/>
//         <QuestionCard value="1"/>
//         <QuestionCard value="1"/>
//         <QuestionCard value="1"/>
//       </div>
//       <div className="Game-Row">
//         <QuestionCard value="1"/>
//         <QuestionCard value="1"/>
//         <QuestionCard value="1"/>
//         <QuestionCard value="1"/>
//       </div>
//       <div className="Game-Row">
//         <QuestionCard value="1"/>
//         <QuestionCard value="1"/>
//         <QuestionCard value="1"/>
//         <QuestionCard value="1"/>
//       </div>
//       <div className="Game-Row">
//         <QuestionCard value="1"/>
//         <QuestionCard value="1"/>
//         <QuestionCard value="1"/>
//         <QuestionCard value="1"/>
//       </div>

//     </div>
//   );
// };


export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Welcome to My Game
        </h1>
        <GameBoard />
      </header>
    </div>
  );
}



