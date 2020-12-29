import { useState } from 'react';

const Card = ({ card, handleClick }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className={card.className}>
      <div className="card-back card-face" onClick={handleClick}>
        back
      </div>
      <div className="card-front card-face">{card.value}</div>
    </div>
  );
};

export default Card;
