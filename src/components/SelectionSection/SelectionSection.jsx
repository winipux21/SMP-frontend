import React from 'react';
import grmother from '../../assets/grmother.png';
import './SelectionSection.css';

const SelectionSection = () => {
  return (
    <div className="selection-section">
      <img src={grmother} alt="Grandmother" className="selection-image" />
      <div className="selection-content">
        <h2 className="selection-question">В какой ситуации вы находитесь?</h2>
        <a href="#help" className="selection-button help-button">Я хочу помочь</a>
        <a href="#reports" className="selection-button need-help-button">Мне нужна помощь</a>
      </div>
    </div>
  );
};

export default SelectionSection;
