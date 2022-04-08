import React from 'react';
import { Card } from "react-bootstrap";
import Products from './Products';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faXmark} from '@fortawesome/free-solid-svg-icons'
function Modal({ onClose, currentProduct }) {

  return (
  

       
    <div className="modalBackdrop diagonal-bar">
          <div className="d-flex flex-row-reverse m-3">
    <FontAwesomeIcon icon={faXmark} className="fa-2x" onClick={onClose}/>
    </div>
      <div className="modalContainer d-flex flex-column align-items-center justify-content-center">

        <Card className="overflow-auto p-4 ">
        <Card.Text className="h2 d-flex justify-content-center">{currentProduct.title}</Card.Text>
          <Card.Img variant="top"
            src={currentProduct.photo}></Card.Img>
          <Card.Text className="h5 pt-2">$ {currentProduct.price.$numberDecimal}</Card.Text>
          <Card.Text className="h5 pt-2">{currentProduct.description}</Card.Text>
          <Card.Text className='h6 pt-2'>{currentProduct.city} on {currentProduct.createdAt}</Card.Text>
          {currentProduct.comments.map((comment, i) => (
            <>
              {comment.hasOwnProperty("userId") && (
                <Card.Text className="h6">Added by {comment.userId.username} on {comment.createdAt}</Card.Text>)}
              <Card.Text>{comment.commentBody}</Card.Text>
            </>
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