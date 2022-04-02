import React from 'react';

function Modal({ onClose, currentPhoto }) {

  return (
    <div className="modalBackdrop">
      <div className="modalContainer">
        {/* <h3 className="modalTitle">{name}</h3> */}
        <img src={currentPhoto} alt="current category" />
        <button type="button" onClick={onClose}>
          Close this modal
        </button>
      </div>
    </div>
  );
}

export default Modal;