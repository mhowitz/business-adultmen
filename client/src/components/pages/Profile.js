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
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});


  useEffect(() => {
    if (userState.loggedIn) {
      _newProducts().catch();
      _savedProducts().catch();
    }
  }, []);

  async function _savedProducts(req, res) {
    let response = await fetch(`/api/users/saves/${userState._id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setSavedProducts(data.saves);
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
  }

  const [currentPhoto, setCurrentPhoto] = useState();
 

  const _unSaveProduct = async (clickedProduct) => {
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
  };

  const _deleteProduct = async (clickedProduct) => {
    const response = await fetch(`/api/products/${clickedProduct}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    _newProducts();
  };

  // pull up a modal when user clicks photo

  const toggleModal = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(!isModalOpen);
  };


  // change page to post page when title clicked

  return (
    <>
      {isModalOpen && (
        <Modal currentProduct={currentProduct}
        onClose={toggleModal} />
      )}

      {!userState.loggedIn && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "5vh" }}
        >
          <h1 className="text-danger">please log in to view your posts!</h1>
        </div>
      )}

      <section className=" vh-100">
        <h2 className="profile-title-top mt-3">My Posted Items</h2>
        <Row xs={1} sm={2} md={3} className="g-4">
          {!savedProducts.length && (
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>No products posted!</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>

        {/* top bar */}
        {(userState.loggedIn && ownedProducts.length > 0) ? (
            <div className="wrapper mt-4">
            {ownedProducts.map((product, i) => (
              <div className="">
                <Card className="card-border row-card">
                  <Card.Img className="img-hover"
                    variant="top"
                    onClick={() => toggleModal(product)}
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
        ) : userState.loggedIn ? (
          <Row xs={1} sm={2} md={3} className="g-4">
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>No products posted!</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (<></>)}
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
          <div className="wrapper mt-4">
            {savedProducts.map((product, i) => (
              <div className="">
                <Card className="card-border row-card">
                  <Card.Img className="img-hover"
                    variant="top"
                    onClick={() => toggleModal(product)}
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
