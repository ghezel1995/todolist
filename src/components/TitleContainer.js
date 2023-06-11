import React from 'react';

const TitleContainer = ({ completed, title }) => {
  return (
    <span className='title-container'>
      <i
        className={`bi ${
          completed
            ? 'bi-check-square completed-icon'
            : 'bi-hourglass-split incomplete-icon'
        }`}
      />
      <span className={`${completed ? 'completed-text' : ''}`}>{title}</span>
    </span>
  );
};

export default TitleContainer;
