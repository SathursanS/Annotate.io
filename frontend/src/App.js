import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import UploadImage from './components/uploadImage/uploadImage';
import { ReactComponent as Logo } from './images/annotate-logo.svg';
import './App.css';

function App() {
  const [analysisInfo, setAnalysisInfo] = useState({});

  useEffect(() => {
    console.log(analysisInfo);
  }, [analysisInfo]);

  return (
    <div className="App">
      <div className="App-header">
        <div className="light-overlay">
          <div className="navbar">
            <span>
              <Logo height="50px" />
            </span>{' '}
            <span className="title-offset">nnotate.io</span>
          </div>
          <UploadImage setAnalysisInfo={setAnalysisInfo} />
          {/* Analysis Card Container Test */}
          <div className="test-colour"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
