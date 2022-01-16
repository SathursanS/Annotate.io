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
          props.handlerInput(e);
        }}
      />
      {props.showButton && (
        <label
          className="choose-file-button-light"
          onClick={props.handlerButton}
        >
          {props.buttonText}
        </label>
      )}
    </div>
  );
};

export default InputComponent;
