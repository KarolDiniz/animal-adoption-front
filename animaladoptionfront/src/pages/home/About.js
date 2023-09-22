import React from 'react';
import'../../components/style/standart.css'

function About({ onBackClick }) {
  const handleBackClick = () => {
    onBackClick();
  };

  return (
    <div className="about">
      <h2>About</h2>
      <p>Author: Karoline Diniz Ramos</p>
      <p>Developed for the DAC course with Professor Elenilson Vieira</p>
      <button className="btn btn-primary" onClick={handleBackClick}>
        Back
      </button>
    </div>
  );
}

export default About;
