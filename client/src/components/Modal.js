import React from 'react';
import { Card} from "react-bootstrap";

function Modal({ onClose, currentProduct }) {

  return (
    <div className="modalBackdrop">
      <div className="modalContainer d-flex flex-column align-items-center justify-content-center">
        {/* <h3 className="modalTitle">{name}</h3> */}
        <img src={currentProduct.photo} alt="current category" />
        {currentProduct.comments.map((comment, i) => (
          <>
              <Card.Text>{comment.commentBody}</Card.Text>
              {comment.hasOwnProperty("userId") && (
                <Card.Text>{comment.userId.username}</Card.Text> )}
            </>
          ))}
        <button className="modalButton" type="button" onClick={onClose}>
          Close this modal
        </button>
      </div>
    </div>
  );
}

export default Modal;