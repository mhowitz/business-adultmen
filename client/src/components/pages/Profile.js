import React, { useState, useEffect, useContext } from "react";
// import Slider from "react-slick";
import { UserContext } from "../../contexts";
import { Card, Row, Col } from "react-bootstrap";
import Modal from "../Modal";

const Profile = () => {
  const [ownedProducts, setOwnedProducts] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);
  const [update, setUpdate] = useState(false);
  const [userState, dispatch] = useContext(UserContext);
  
    useEffect(() => {

      if(userState.loggedIn){
        _newProducts().catch(console.error);
        _savedProducts().catch(console.error);
      }
      console.log("userState", userState);

    }, []);

    async function _savedProducts(req, res) {
      let response = await fetch(`/api/users/saves/${userState._id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data  = await response.json();
      console.log(data.saves);
      setSavedProducts(data.saves);
      console.log("savedProducts", data.saves);
    }

    async function _newProducts() {
      let response = await fetch(`/api/users/owned/${userState._id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      setOwnedProducts(response.ownedProducts);
      console.log("ownedProducts", response.ownedProducts);
    }


  const [currentPhoto, setCurrentPhoto] = useState();
  const toggleModal = (image) => {
    setCurrentPhoto(image);
    setIsModalOpen(!isModalOpen);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const _unSaveProduct = async (clickedProduct) => {
    console.log(userState);
    const response = await fetch(`/api/products/unSave/${userState._id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: clickedProduct,
      }),
    });

    const data = await response.json();
    _savedProducts();
    console.log(data);
  };

  const _deleteProduct = async (clickedProduct) => {
    console.log(userState);
    const response = await fetch(`/api/products/${clickedProduct}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    _newProducts();
    console.log(data);
  };

  // pull up a modal when user clicks photo

  // change page to post page when title clicked

  return (
    <>
      {!userState.loggedIn && (
        <div className="d-flex justify-content-center align-items-center" style={{height:"5vh"}}>
          <h1 className="text-danger">please log in to view your posts!</h1>
        </div>      )}
        
      {isModalOpen && (
        <Modal currentPhoto={currentPhoto} onClose={toggleModal} />
      )}

      <section className=" vh-100">
      <h2 className="profile-title-top mt-3">My Posted Items</h2>

        {/* top bar */}
        {userState.loggedIn && (
        <div className ="wrapper mt-4">
         {ownedProducts.map((product, i) => (
          <div className="">
            <Card className="card-border row-card">
              <Card.Img
                variant="top"
                onClick={() => toggleModal(product.photo)}
                src={product.photo}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>Category: {product.category}</Card.Text>
                <Card.Text>City: {product.city}</Card.Text>
                <Card.Text>$ {product.price.$numberDecimal}</Card.Text>
                {/* <Card.Text> {product.description}</Card.Text> */}
                <button
                  key={product._id}
                  className="btn m-2"
                  onClick={() => _deleteProduct(product._id)}
                >
                  Sold
                </button>
              </Card.Body>
            </Card>
          </div>  
         ))}
        </div>
        )}

        
        <Row xs={1} sm={2} md={3} className="g-4">

        {!ownedProducts.length && (
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>No products posted!</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
        {/* bottom bar */}

        <h2 className="profile-title-bottom mb-2">My Saved Items</h2>
        <Row xs={1} sm={2} md={3} className="g-4">

        {!savedProducts.length && (
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>No saved products!</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>

        {userState.loggedIn && (
        <div className ="wrapper mt-4">
         {savedProducts.map((product, i) => (
          <div className="">
            <Card className="card-border row-card">
              <Card.Img
                variant="top"
                onClick={() => toggleModal(product.photo)}
                src={product.photo}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>Category: {product.category}</Card.Text>
                <Card.Text>City: {product.city}</Card.Text>
                <Card.Text>$ {product.price.$numberDecimal}</Card.Text>
                {/* <Card.Text> {product.description}</Card.Text> */}
                <button
                    key={product._id}
                    className="btn m-2"
                    onClick={() => _unSaveProduct(product._id)}
                  >
                    Remove
                  </button>
              </Card.Body>
            </Card>
          </div>  
         ))}
        </div>
        )}
      
      </section>
    </>
  );
}; 

export default Profile;
