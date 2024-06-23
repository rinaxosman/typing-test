import React from 'react';

const Results = ({ time, wpm, accuracy }) => (
  <div className="results mt-4">
    <p>Time: <span>{time}</span> seconds</p>
    <p>Words Per Minute: <span>{wpm}</span></p>
    <p>Accuracy: <span>{accuracy}</span>%</p>
  </div>
);

export default Results;