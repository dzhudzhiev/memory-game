import { useState, useEffect } from 'react';

import Card from './Card';

const Board = ({ cards, timer, flipCard }) => {
  return (
    <div className="game-container">
      <p className="game-info">
        Time: <span id="time-remaining">{timer}</span>
      </p>
      {cards.map(card => (
        <Card key={card.id} card={card} handleClick={() => flipCard(card)} />
      ))}
    </div>
  );
};

export default Board;
