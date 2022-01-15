import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import './uploadImage.css';
import InputComponent from '../inputComponent';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.mode === 'light' ? '#d4d2fb' : '#d4d2fb',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#3c3885' : '#3c3885',
  },
}));

const UploadImage = ({ setAnalysisInfo }) => {
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const handleAnalyze = async (path) => {
    setLoadingMessage('Analyzing Video');
    // Fetch the analysis
    let response = await fetch('http://localhost:5000/assemblyAI', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filename: path }),
    });
    let json = await response.json();
    setAnalysisInfo(json);
    setLoading(false);
  };

  const handleYoutubeLink = async () => {
    let response;
    let json;

    setLoadingMessage('Uploading Video');
    setLoading(true);

    //Post email and password to back end and get authenticated
    response = await fetch('http://localhost:5000/upload/youtube', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        link,
      }),
    });

    json = await response.json();
    console.log(json.message);
    handleAnalyze(json.message);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    let response;
    let json;

    setLoadingMessage('Uploading Video');
    setLoading(true);

    let file = e.target.files[0];
    console.log(e.target.files[0]);
    const formData = new FormData();

    formData.append('file', file);
    formData.append('filename', 'attachment');

    response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    });

    json = await response.json();
    console.log(json.message);
    handleAnalyze(json.message);
  };

  return (
    <div className="main-container">
      <div className="upload-headline">
        Create your{' '}
        <span className="upload-headline-emphasized">interactive</span> notes.
      </div>
      <div className="upload-subtitle">
        Build your annotated and dynamic transcript in{' '}
        <span className="upload-subtitle-emphasized">one click.</span>
      </div>
      <div className="drag-drop-container">
        {!loading && (
          <>
            <div className="file-upload-container">
              <input
                className="input-link"
                type="text"
                value={link}
                placeholder="Enter a Youtube URL or choose a file..."
                onChange={(e) => {
                  setLink(e.target.value);
                }}
              />
              {!link && (
                <>
                  <label for="file-upload" className="choose-file-button">
                    Select File
                  </label>
                  <input
                    className="no-display"
                    id="file-upload"
                    type="file"
                    accept=".mp4"
                    onChange={(e) => handleFileUpload(e)}
                  />
                </>
              )}
              {link && (
                <>
                  <label
                    className="choose-file-button"
                    onClick={handleYoutubeLink}
                  >
                    Analyze
                  </label>
                </>
              )}
            </div>
            or drop files here.
          </>
        )}
        {loading && (
          <div>
            <label className="loading-message">{loadingMessage}</label>
            <Box
              sx={{
                width: '735px',
                height: 10,
                marginTop: '10px',
                borderRadius: 5,
              }}
            >
              <BorderLinearProgress />
            </Box>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
