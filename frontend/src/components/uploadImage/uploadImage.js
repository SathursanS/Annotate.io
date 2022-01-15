import React from 'react';
import './uploadImage.css';

const UploadImage = () => {
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
        <div className="drag-drop-button">Select File</div>
        or drop files here.
      </div>
    </div>
  );
};

export default UploadImage;
