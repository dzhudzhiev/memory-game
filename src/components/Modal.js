import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const Modal = ({
  isOpen,
  startGame,
  modalView,
  setModalView,
  results,
  timer
}) => {
  const views = {
    start: (
      <div className="start-container">
        <h1 className="page-title">Memory Game</h1>
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
        <button
          className="results-button"
          onClick={() => setModalView('results')}
        >
          Show results
        </button>
      </div>
    ),
    results: (
      <div className="results-container">
        {timer > 0 && <p>Your time: {timer}</p>}
        <p>Best results:</p>
        <ul className="results-list">
          {results.map((result, index) => (
            <li className="results-item" key={index}>
              {result}
            </li>
          ))}
        </ul>
        <button
          className="results-button"
          onClick={() => setModalView('start')}
        >
          Back
        </button>
      </div>
    )
  };

  return <ReactModal isOpen={isOpen}>{views[modalView]}</ReactModal>;
};

export default Modal;
