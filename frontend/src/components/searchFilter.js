import React, { useState } from 'react';
import InputComponent from './inputComponent';

const SearchFilter = ({ setFilteredList, originalList }) => {
  const [filter, setFilter] = useState('');

  const handleInput = (e) => {
    console.log(e.target.value);
    setFilter(e.target.value);
    let newVal = e.target.value.replace(/ /g, '');
    setFilteredList(
      originalList.filter((property) => {
        const labelArr = property['labels'][0]['label'].split('>');
        for (let j = 0; j < labelArr.length; j++) {
          if (labelArr[j].includes(newVal)) {
            return true;
          }
        }
        const textNoSpace = property['text'].replace(/ /g, '');
        if (textNoSpace.includes(newVal)) {
          return true;
        }
      })
    );
  };

  return (
    <div className="search-container">
      <InputComponent
        value={filter}
        placeholder="Filter by a keyword..."
        handlerInput={handleInput}
        showButton={false}
      />
    </div>
  );
};

export default SearchFilter;
