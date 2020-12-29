import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const Modal = ({ isOpen, startGame, modalView }) => {
  const [view, setView] = useState('');

  useEffect(() => {
    setView(modalView);
  }, [modalView]);

  const views = {
    start: (
      <>
        Start Game
        <button onClick={startGame}>Start Game</button>
        <button onClick={() => setView('results')}>Show results</button>
      </>
    ),
    results: (
      <>
        Results
        <button onClick={() => setView('start')}>Back</button>
      </>
    )
  };

  return <ReactModal isOpen={isOpen}>{views[view]}</ReactModal>;
};

export default Modal;
