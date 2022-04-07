import React from 'react';
import { Card } from "react-bootstrap";
import Products from './Products';

function Modal({ onClose, currentProduct }) {

  return (
    <div className="modalBackdrop diagonal-bar">
      <div className="modalContainer d-flex flex-column align-items-center justify-content-center">

        <Card className="overflow-auto card-border pt-4 ">
        <Card.Text className="h3">{currentProduct.title}</Card.Text>
          <Card.Img variant="top"
            src={currentProduct.photo}></Card.Img>

          <Card.Text className="h5 p-2">{currentProduct.description}</Card.Text>

          {currentProduct.comments.map((comment, i) => (
            <Card.Body>
              {comment.hasOwnProperty("userId") && (
                <Card.Text className="h6">Added by {comment.userId.username} on {comment.createdAt}</Card.Text>)}
              <Card.Text>{comment.commentBody}</Card.Text>
            </Card.Body>
          ))}
          <button className="btn" type="button" onClick={onClose}>
          take me back
        </button>
        </Card>

      </div>
    </div>
  );
}

export default Modal;