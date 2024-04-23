import { useEffect, useState } from 'react';
import './App.css';




export const QuestionTimer = ( {startTime, timeout} ) => {

    const [seconds, setSeconds] = useState(20);
    const [started, setStarted] = useState(false);

    const timeoutLocal = () => {
        setStarted(false);
        timeout()
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
            timeoutLocal();
        }
        return () => clearInterval(interval);
    }, [started, seconds]);

    let timeColor = 'green';
    let upperTime = 20;
    let midTime = upperTime/2;
    let lowTime = upperTime/4
    
    if(seconds < upperTime && seconds >= midTime){
        timeColor = 'green';
    }else if(seconds < midTime && seconds >= lowTime){
        timeColor = 'yellow';
    }else if(seconds < lowTime){
        timeColor = 'red';
    }

    return (
        <div>
            <h3>Countdown Timer</h3>
            <p style={{color:timeColor}}>{seconds}</p>
            
        </div>
      
    );

  };