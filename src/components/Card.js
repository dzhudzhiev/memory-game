import sprite from '../assets/sprite.svg';

const Card = ({ card, handleClick }) => {
  return (
    <div className={card.className}>
      <div className="card-back card-face" onClick={handleClick}></div>
      <div className="card-front card-face">
        <svg height={50}>
          <use href={`${sprite}#icon-${card.value}`} />
        </svg>
      </div>
    </div>
  );
};

export default Card;
