import React from 'react';

function Modal({ onClose, currentPhoto }) {

  return (
    <div className="modalBackdrop">
      <div className="modalContainer d-flex flex-column align-items-center justify-content-center">
        {/* <h3 className="modalTitle">{name}</h3> */}
        <img src={currentPhoto} alt="current category" />
        <button className="modalButton" type="button" onClick={onClose}>
          Close this modal
        </button>
      </div>
    </div>
  );
}

export default Modal;