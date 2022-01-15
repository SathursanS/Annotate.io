import React from 'react';
import './inputComponent.css';

const InputComponent = (props) => {
  return (
    <div className="input-container">
      <input
        className="input-link"
        type="text"
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => {
          props.setValue(e.target.value);
        }}
      />
      <label className="choose-file-button" onClick={props.handler}>
        {props.buttonText}
      </label>
    </div>
  );
};

export default InputComponent;
