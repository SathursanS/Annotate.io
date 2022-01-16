import React, { useState } from 'react';
import InputComponent from './inputComponent';

const SearchFilter = ({ setFilteredList, originalList }) => {
  const [filter, setFilter] = useState('');

  const handleInput = (e) => {
    setFilter(e.target.value);
    let newVal = e.target.value.replace(/ /g, '').toLowerCase();
    setFilteredList(
      originalList.filter((property) => {
        const labelArr = property['labels'][0]['label'].split('>');
        for (let j = 0; j < labelArr.length; j++) {
          if (labelArr[j].toLowerCase().includes(newVal)) {
            console.log('included');
            return true;
          }
        }
        const textNoSpace = property['text'].replace(/ /g, '').toLowerCase();
        if (textNoSpace.includes(newVal)) {
          console.log('included');
          return true;
        }
      })
    );
  };

  return (
    <InputComponent
      value={filter}
      placeholder="Filter by a keyword..."
      handlerInput={handleInput}
      showButton={false}
    />
  );
};

export default SearchFilter;
