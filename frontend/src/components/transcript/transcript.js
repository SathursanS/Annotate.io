import React, { useState, useEffect } from 'react';
import './transcript.css';

const Transcript = (props) => {
  const { data } = props;
  const [buttonType, setButtonType] = useState(1);
  const [resultData, setResultData] = useState([
    'Hello World',
    'Coding is Fun!',
    'Good day!',
  ]);

  const [topics, setTopics] = useState(['topic 1', 'topic 2', 'topic 3']);

  // remember to update the textdata
  //   useEffect(() => {
  //     setResultData(data['iab_categories_result']['results']);
  //   }, [data]);

  return (
    <div className="transcript-main-container">
      <h2 className="transcript-header"></h2>
      <div className="button-container">
        <button className="summaryButton" onClick={() => setButtonType(1)}>
          Chapter Summary
        </button>
        <button className="transcriptButton" onClick={() => setButtonType(2)}>
          Transcript
        </button>
      </div>

      {buttonType === 1 && (
        <div className="transcript-body-container">
          {resultData.map((item) => {
            return (
              <div className="paragraph-card">
                <h3 className="chapter-heading">{item}</h3>
                <p className="paragraph-text">{item}</p>
              </div>
            );
          })}
        </div>
      )}

      {buttonType === 2 && (
        <div className="transcript-body-container">
          {resultData.map((item) => {
            return (
              <div className="paragraph-card">
                <p className="paragraph-text">{item}</p>
                <div className="bubbles-container">
                  {topics.map((topic) => {
                    return (
                      <div className="bubble-wrapper">
                        <p className="bubble-heading">TOPIC</p>
                        <p className="bubble-text">{topic}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Transcript;
