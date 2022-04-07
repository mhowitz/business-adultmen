import React from 'react';
import { Card } from "react-bootstrap";
import Products from './Products';

function Modal({ onClose, currentProduct }) {

  return (
    <div className="modalBackdrop">
      <div className="card-border modalContainer d-flex flex-column align-items-center justify-content-center">
        {/* <h3 className="modalTitle">{name}</h3> */}
        <Card>
          <Card.Img variant="top"
          src={currentProduct.photo}></Card.Img>
            <Card.Text>Description: {currentProduct.description}</Card.Text>
        {/* <img src={currentProduct.photo} alt="current category" /> */}
        {currentProduct.comments.map((comment, i) => (
          <Card.Body>
              <Card.Text>Comments: {comment.commentBody}</Card.Text>
              {comment.hasOwnProperty("userId") && (
                <Card.Text>User: {comment.userId.username}</Card.Text> )}
          </Card.Body>
          ))}
          </Card>
        <button className="btn" type="button" onClick={onClose}>
          take me back
        </button>
      </div>
    </div>
  );
}

export default Modal;