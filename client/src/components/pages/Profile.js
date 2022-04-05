import React, { useState, useEffect, useContext } from "react";
// import Slider from "react-slick";
import Products from "../Products";
import { UserContext } from "../../contexts";
import { Card, Row, Col } from "react-bootstrap";
import Modal from "../Modal";

const Profile = () => {
  const [ownedProducts, setOwnedProducts] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);
  const [ userState, dispatch ] = useContext(UserContext);

  useEffect(() => {
    async function _newProducts() {
      let response = await fetch(`/api/users/owned/${userState._id}`, {
        method: "GET",
        headers: {
          'Accept': "application/json",
          "Content-Type": "application/json"
        },
      });
      response = await response.json();
      setOwnedProducts(response.ownedProducts);
      console.log("ownedProducts", response.ownedProducts)
    }
    _newProducts().catch(console.error);

    async function _savedProducts(req, res) {
      let response = await fetch(`/api/users/saves/${userState._id}`, {
        method: "GET",
        headers: {
          'Accept': "application/json",
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      console.log(response)
      setSavedProducts(response);
      console.log("savedProducts", response.savedProducts)
    }
    _savedProducts().catch(console.error);

    console.log("userState", userState);
    
    
  }, []);

  const [currentPhoto, setCurrentPhoto] = useState();
  const toggleModal = (image) => {
    setCurrentPhoto(image);
    setIsModalOpen(!isModalOpen);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  
 
  // pull up a modal when user clicks photo
 
  // change page to post page when title clicked
  
  return (

    <>
     {isModalOpen && (
        <Modal currentPhoto={currentPhoto} onClose={toggleModal} />
      )}
      <section className=" vh-100">
        {/* top bar */}
        {/* <div className ="wrapper mt-4">
  
          <div className="item">
            <h1>Title</h1>
            <div>image</div>
            <p>description</p>
            <p>user posted</p>
            <p>product category</p>
            <button>Un-save</button>
          </div>
          <div className="item">box 2</div>
          <div className="item">box 3</div>
          <div className="item">box 4</div>
          <div className="item">box 5</div>
          <div className="item">box 6</div>
        </div> */}

        <Row xs={1} sm={2} md={3} className="g-4 mt-4">
        
        {ownedProducts.map((product, i) => (
          <Col>
            <Card>
              <Card.Img variant="top" onClick={() => toggleModal(product.photo)}
              src={product.photo} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>Category: {product.category}</Card.Text>
                <Card.Text>City: {product.city}</Card.Text>
                <Card.Text>$ {product.price.$numberDecimal}</Card.Text>
                <Card.Text> {product.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

        {/* bottom bar */}
      
      <Row xs={1} sm={2} md={3} className="g-4 mt-4">
        
        {savedProducts.map((product, i) => (
          <Col>
            <Card>
              <Card.Img variant="top" onClick={() => toggleModal(product.photo)}
              src={product.photo} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>Category: {product.category}</Card.Text>
                <Card.Text>City: {product.city}</Card.Text>
                <Card.Text>$ {product.price.$numberDecimal}</Card.Text>
                <Card.Text> {product.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
        {/* <div className ="wrapper">
          <div className="item">
              <h1>Title</h1>
              <div>image</div>
              <p>description</p>
              <p>user posted</p>
              <button>Un-save</button>
          </div>
          <div className="item">box 1</div>
          <div className="item">box 2</div>
          <div className="item">box 3</div>
          <div className="item">box 4</div>
          <div className="item">box 5</div>
          <div className="item">box 6</div>
        </div> */}
        
      </section>
    </>
  )
}

export default Profile