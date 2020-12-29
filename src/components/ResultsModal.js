import Modal from 'react-modal';

const ResultsModal = ({ isOpen, setIsOpen }) => {
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <Modal isOpen={isOpen}>
      Results
      <button onClick={closeModal}>Back</button>
    </Modal>
  );
};

export default ResultsModal;
