export const shuffleCards = cards => {
  const cardsCopy = [...cards];
  for (let i = cardsCopy.length - 1; i > 0; i--) {
    let randIndex = Math.floor(Math.random() * (i + 1));
    const temp = cardsCopy[randIndex];
    cardsCopy[randIndex] = cardsCopy[i];
    cardsCopy[i] = temp;
  }
  return cardsCopy;
};

export const setVisible = (cards, cardToSet) =>
  cards.map(card => {
    if (card.id === cardToSet.id) {
      return { ...card, className: 'card visible' };
    }
    return card;
  });

export const setNotVisible = (cards, card1, card2 = {}) =>
  cards.map(card => {
    if (card.id === card1.id) {
      return { ...card, className: 'card' };
    } else if (card.id === card2.id) {
      return { ...card, className: 'card' };
    }
    return card;
  });

export const setMatched = (cards, card1, card2) =>
  cards.map(card => {
    if (card.id === card1.id) {
      return { ...card, className: 'card matched' };
    } else if (card.id === card2.id) {
      return { ...card, className: 'card matched' };
    }
    return card;
  });

export const resetCards = cards =>
  cards.map(card => ({ ...card, className: 'card' }));
