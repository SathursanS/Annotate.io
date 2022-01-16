import React, { useState, useEffect } from 'react';
import InputComponent from '../inputComponent';
import SearchFilter from '../searchFilter';
import './transcript.css';

const Transcript = ({ analysisInfo }) => {
  const [buttonType, setButtonType] = useState(1);
  const [originalResultData, setOriginalResultData] = useState([]);
  const [filterResultData, setFilterResultData] = useState([]);
  // const [topics, setTopics] = useState([]);
  // const [filterTopics, setFilterTopics] = useState([]);
  const [email, setEmail] = useState('');
  // analysisInfo &&
  //   setOriginalResultData(analysisInfo['iab_categories_result']['results']);

  useEffect(() => {
    setOriginalResultData(analysisInfo['iab_categories_result']['results']);
  }, [analysisInfo]);

  useEffect(() => {
    setFilterResultData(originalResultData);
  }, [originalResultData]);

  const handleEmailSend = async () => {
    let response;

    response = await fetch('http://localhost:5000/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ toEmail: email }),
    });
    let json = await response.json();

    setEmail('');
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  // analysisInfo && console.log(analysisInfo['iab_categories_result']['results']);

  return (
    <div className="transcript-main-container">
      <h2 className="transcript-header"></h2>
      <div className="button-container">
        <button
          className={`${
            buttonType !== 1 ? 'transcript-button' : 'selected-button'
          }`}
          style={{ marginLeft: 20 }}
          onClick={() => setButtonType(1)}
        >
          Chapter Summary
        </button>
        <button
          className={`${
            buttonType !== 2 ? 'transcript-button' : 'selected-button'
          }`}
          style={{ marginRight: 20 }}
          onClick={() => setButtonType(2)}
        >
          Transcript
        </button>
      </div>
      <div className="controls-container">
        <div className="controls-comp" style={{ marginLeft: 20 }}>
          <SearchFilter
            originalList={originalResultData}
            setFilteredList={setFilterResultData}
          />
        </div>
        <div className="controls-comp" style={{ marginRight: 20 }}>
          <InputComponent
            value={email}
            placeholder={'Enter email to send copy...'}
            setValue={setEmail}
            handlerButton={handleEmailSend}
            buttonText={'Send'}
            handlerInput={handleEmailInput}
            showButton={true}
          />
        </div>
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
          {filterResultData.map((item) => {
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
