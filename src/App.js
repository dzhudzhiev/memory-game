import { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import Modal from './components/Modal';
import {
  shuffleCards,
  setVisible,
  setNotVisible,
  setMatched,
  resetCards,
  addResult
} from './utils/utils';
import data from './data/data';

function App() {
  const [cards, setCards] = useState(data);
  const [timer, setTimer] = useState(0);
  const [cardToCheck, setCardToCheck] = useState(null);
  const [matchedCards, setMatchedCards] = useState([]);
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState([]);

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
    setResults(addResult(results, timer));
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    if (matchedCards.length === cards.length) finishGame();
    // eslint-disable-next-line
  }, [matchedCards]);

  useEffect(() => {
    try {
      const fromLocalStorage = JSON.parse(localStorage.getItem('results'));
      if (fromLocalStorage) setResults(fromLocalStorage);
    } catch (e) {
      console.log(e);
    }
    return () => {
      clearInterval(timerId);
      clearTimeout(timeOutId);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="app">
      <Modal
        isOpen={isOpenModal}
        startGame={startGame}
        modalView={modalView}
        setModalView={setModalView}
        results={results}
        timer={timer}
      />
      <Board cards={cards} timer={timer} flipCard={flipCard} />
    </div>
  );
}

export default App;
