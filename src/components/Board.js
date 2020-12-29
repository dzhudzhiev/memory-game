import { useState, useEffect } from 'react';

import Card from './Card';

const Board = ({ cards, timer, flipCard }) => {
  return (
    <div className="game-container">
      <p className="game-info">Time: {timer}</p>
      {cards.map(card => (
        <Card key={card.id} card={card} handleClick={() => flipCard(card)} />
      ))}
      <div className="icons-attribute">
        Icons made by{' '}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
};

export default Board;
