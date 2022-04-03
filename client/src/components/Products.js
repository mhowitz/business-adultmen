import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { Card, Row, Col } from "react-bootstrap";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function newProducts() {
      let response = await fetch("/api/products", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      console.log(response);
      setProducts(response);
    }
    newProducts().catch(console.error);
  }, []);

  const [currentPhoto, setCurrentPhoto] = useState();
  const toggleModal = (image) => {
    setCurrentPhoto(image);
    setIsModalOpen(!isModalOpen);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {isModalOpen && (
        <Modal currentPhoto={currentPhoto} onClose={toggleModal} />
      )}
      
      <Row xs={1} sm={2} md={3} className="g-4 mt-4">
        
        {products.map((product, i) => (
          <Col>
            <Card>
              <Card.Img variant="top"               onClick={() => toggleModal(product.photo)}
              src={product.photo} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>Category: {product.category}</Card.Text>
                <Card.Text>City: {product.city}</Card.Text>
                <Card.Text>$ {product.price.$numberDecimal}</Card.Text>
                <Card.Text> {product.description}</Card.Text>
                <button className="btn m-2">Save for later</button>
                <button className="btn m-2">Venmo!</button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Products;
