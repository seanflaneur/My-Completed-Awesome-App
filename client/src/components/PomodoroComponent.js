import React from "react";
import { useState, useEffect } from "react";

function PomodoroComponent({
  // updateActions,
  // resetActions,
  // setRunPomodoro,
  onTimerFinish,
  currentState,
  onPomodoroStart,
  onPomodoroStop,
  onPomodoroForward,
}) {
  // const [showAffirmation, setShowAffirmation] = useState(false);
  // const [pomodoro, setPomodoro] = useState(false);
  // const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState();
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);
  // const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log(currentState);
    if (currentState === "idle") {
      setIsPomodoroRunning(false);
      setSeconds(10);
    } else if (currentState === "focus") {
      setIsPomodoroRunning(true);
      setSeconds(5);
    } else if (currentState === "relax") {
      setIsPomodoroRunning(true);
      setSeconds(2);
    }
  }, [currentState]);
  //called when currentState finishes

  useEffect(() => {
    if (isPomodoroRunning) {
      // bug milliseconds not seconds
      let interval = setInterval(() => {
        // convention
        clearInterval(interval);
        if (seconds === 0) {
          onTimerFinish();
        }
        // if seconds not 0, count down by 1
        else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
  }, [isPomodoroRunning, seconds]);

  const handlePlay = () => {
    // setIsPomodoroRunning(true);
    // setRunPomodoro(true);
    // updateActions(0);
    onPomodoroStart();
  };

  const handleStop = () => {
    // setIsPomodoroRunning(false);
    // setSeconds(25 * 60);
    // setShowAffirmation(false);
    // resetActions();
    onPomodoroStop();
  };
  const handleForward = () => {
    onPomodoroForward();
  };

  let buttons;
  if (currentState === "focus") {
    buttons = [
      <button onClick={handleStop}>⏹️</button>,
      <button onClick={handleForward}> ⏩ </button>,
    ];
  } else if (currentState === "relax") {
    buttons = <button onClick={handleStop}>⏹️ </button>;
  } else if (currentState === "idle") {
    buttons = <button onClick={handlePlay}> ▶️ </button>;
  }
  return (
    <div>
      <div>
        {buttons}
        <div></div>
        <div></div>
        <div className="timer">
          {Math.floor(seconds / 60)} : {seconds % 60}
        </div>
      </div>
      {currentState === "relax" ? (
        <div className="affirmation box">
          <h1>You can relax</h1>
        </div>
      ) : (
        ""
      )}

      {/* REVIEW */}
      {/* <div className="affirmation">
        {currentState === "focus" && <h1>You can do this</h1>}
      </div>
       */}
      {currentState === "focus" ? (
        <div className="affirmation">
          <h1>You can do this</h1>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default PomodoroComponent;
