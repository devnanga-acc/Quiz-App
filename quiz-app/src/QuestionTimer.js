import { useEffect, useState } from 'react';
import './App.css';




export const QuestionTimer = ( {startTime} ) => {

    const [seconds, setSeconds] = useState(60);
    const [started, setStarted] = useState(false);

    const timeout = () => {
        console.log('Time done');
    }

    // const startTimer = () => {
    //     setStarted(true);
    // } 

    // if(startTime){
    //     startTimer();
    // }

    // need to use this block to prevent re rendering
    useEffect(() => {
        if(startTime)
            setStarted(true);
    }, [startTime])

    useEffect(() => {
        let interval;
        if (started && seconds > 0){
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds -1)
            }, 1000)
        }else if (seconds === 0){
            clearInterval(interval);
            timeout();
        }
        return () => clearInterval(interval);
    }, [started, seconds]);
    
    console.log(startTime);
    

    return (
        <div>
            <h3>Countdown Timer</h3>
            <p>{seconds}</p>
            
        </div>
      
    );

  };