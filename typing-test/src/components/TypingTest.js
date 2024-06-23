import React, { useState, useEffect } from 'react';
import Results from './Results';
import Header from './Header';

const TypingTest = () => {
  const testText = "The quick brown fox jumps over the lazy dog.";
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [time, setTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerInterval;
    if (isRunning) {
      timerInterval = setInterval(() => {
        setTime(Math.floor((new Date().getTime() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isRunning, startTime]);

  const handleStart = () => {
    setIsRunning(true);
    setStartTime(new Date().getTime());
  };

  const handleReset = () => {
    setIsRunning(false);
    setUserInput('');
    setTime(0);
    setWpm(0);
    setAccuracy(0);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);
    if (input === testText) {
      setIsRunning(false);
      calculateResults();
    }
  };

  const calculateResults = () => {
    const timeTaken = (new Date().getTime() - startTime) / 1000;
    const wordsTyped = userInput.split(' ').length;
    const wpmCalc = Math.round((wordsTyped / timeTaken) * 60);
    const accuracyCalc = calculateAccuracy(userInput, testText);

    setWpm(wpmCalc);
    setAccuracy(accuracyCalc);
  };

  const calculateAccuracy = (input, text) => {
    const inputWords = input.split(' ');
    const textWords = text.split(' ');

    let correctWords = 0;

    inputWords.forEach((word, index) => {
      if (word === textWords[index]) {
        correctWords++;
      }
    });

    return Math.round((correctWords / textWords.length) * 100);
  };

  return (
    <div className="container">
      <Header />
      <div className="test-area mb-4">
        <textarea className="form-control mb-2" value={testText} readOnly />
        <textarea
          className="form-control"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Start typing here..."
          disabled={!isRunning}
        />
      </div>
      <Results time={time} wpm={wpm} accuracy={accuracy} />
      <div className="buttons mt-4">
        <button className="btn btn-primary mr-2" onClick={handleStart} disabled={isRunning}>Start Test</button>
        <button className="btn btn-secondary" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default TypingTest;