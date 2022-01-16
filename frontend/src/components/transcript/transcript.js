import React, { useState, useEffect } from 'react';
import './transcript.css';

const Transcript = ({ analysisInfo }) => {
  const [buttonType, setButtonType] = useState(1);
  // const [originalResultData, setOriginalResultData] = useState([]);
  // const [filterResultData, setFilterResultData] = useState([]);
  // const [topics, setTopics] = useState([]);
  // const [filterTopics, setFilterTopics] = useState([]);

  // analysisInfo &&
  //   setOriginalResultData(analysisInfo['iab_categories_result']['results']);

  analysisInfo && console.log(analysisInfo['iab_categories_result']['results']);

  return (
    <div className="transcript-main-container">
      <h2 className="transcript-header"></h2>
      <div className="button-container">
        <button
          className={`${
            buttonType !== 1 ? 'transcript-button' : 'selected-button'
          }`}
          onClick={() => setButtonType(1)}
        >
          Chapter Summary
        </button>
        <button
          className={`${
            buttonType !== 2 ? 'transcript-button' : 'selected-button'
          }`}
          onClick={() => setButtonType(2)}
        >
          Transcript
        </button>
      </div>

      {buttonType === 1 && (
        <div className="transcript-body-container">
          {analysisInfo['chapters'].map((item) => {
            return (
              <div className="paragraph-card">
                <h3 className="chapter-heading">{item['gist']}</h3>
                <p className="paragraph-text">{item['summary']}</p>
              </div>
            );
          })}
        </div>
      )}

      {buttonType === 2 && (
        <div className="transcript-body-container">
          {analysisInfo['iab_categories_result']['results'].map((item) => {
            const list = item['labels'][0]['label'].split('>');
            return (
              <div className="paragraph-card">
                <p className="paragraph-text">{item['text']}</p>
                <div className="bubbles-container">
                  {list.map((topic) => {
                    return (
                      <div className="bubble-wrapper">
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
