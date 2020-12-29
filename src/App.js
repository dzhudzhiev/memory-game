import { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import Modal from './components/Modal';
import {
  shuffleCards,
  setVisible,
  setNotVisible,
  setMatched,
  resetCards
} from './utils';
import data from './data';

function App() {
  const [cards, setCards] = useState(data);
  const [timer, setTimer] = useState(0);
  const [cardToCheck, setCardToCheck] = useState(null);
  const [matchedCards, setMatchedCards] = useState([]);
  const [busy, setBusy] = useState(false);

  const [timerId, setTimerId] = useState(null);
  const [timeOutId, setTimeOutId] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(true);
  const [modalView, setModalView] = useState('start');

  const startGame = () => {
    setCards(shuffleCards(cards));
    setTimer(0);
    setTimerId(setInterval(() => setTimer(seconds => seconds + 1), 1000));
    closeModal();
  };

  const flipCard = cardToFlip => {
    if (!busy) {
      setCards(setVisible(cards, cardToFlip));

      if (cardToCheck) {
        checkForCardMatch(cardToFlip);
        clearTimeout(timeOutId);
      } else {
        setCardToCheck(cardToFlip);
        setTimeOutId(
          setTimeout(() => {
            setCards(setNotVisible(cards, cardToFlip));
            setCardToCheck(null);
          }, 5000)
        );
      }
    }
  };

  const checkForCardMatch = card => {
    if (card.value === cardToCheck.value) {
      cardMatch(card, cardToCheck);
    } else {
      cardMismatch(card, cardToCheck);
    }
    setCardToCheck(null);
  };

  const cardMatch = (card1, card2) => {
    setBusy(true);
    setTimeout(() => {
      setCards(setMatched(cards, card1, card2));
      setMatchedCards(matchedCards.concat([card1, card2]));
      setBusy(false);
    }, 1000);
  };

  const cardMismatch = (card1, card2) => {
    setBusy(true);
    setTimeout(() => {
      setCards(setNotVisible(cards, card1, card2));
      setBusy(false);
    }, 1000);
  };

  const finishGame = () => {
    clearInterval(timerId);
    setModalView('results');
    openModal();
    setCards(resetCards(cards));
    setMatchedCards([]);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    if (matchedCards.length === cards.length) finishGame();
  }, [matchedCards]);

  useEffect(() => {
    return () => {
      clearInterval(timerId);
      clearTimeout(timeOutId);
    };
  }, []);

  return (
    <div className="app">
      <h1 className="page-title">Memory Game</h1>
      <Modal isOpen={isOpenModal} startGame={startGame} modalView={modalView} />
      <Board cards={cards} timer={timer} flipCard={flipCard} />
    </div>
  );
}

export default App;
