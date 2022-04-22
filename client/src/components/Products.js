import React, { useState, useEffect, useContext } from "react";
import Modal from "./Modal";
import { Card, Row, Col } from "react-bootstrap";
import { UserContext } from "../contexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faEnvelope,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
// import  Mailto  from "react-mailto";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [useComment, setUseComment] = useState("");
  const [update, setUpdate] = useState(false);
  const [userState, dispatch] = useContext(UserContext);

  useEffect(() => {
    newProducts().catch();
  }, []);

  async function newProducts() {
    let response = await fetch("/api/products", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setProducts(response);
  }

  const _saveProduct = async (e) => {
    const response = await fetch(`/api/users/saves/${userState._id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: e,
      }),
    });
    if (!userState.loggedIn) {
      alert("not logged in");
      return;
    }

    const data = await response.json();
  };

  const _addComment = async (e, productId) => {
    e.preventDefault();
    const response = await fetch(`/api/comments/${productId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userState._id,
        commentBody: useComment,
      }),
    });
    if (!userState) {
      alert("not logged in");
    }
    const data = await response.json();
    const commentFormInput = document.getElementById("commentFormInput");
    commentFormInput.reset();

    newProducts();
  };

  const handleChange = (event) => {
    event.preventDefault();
    setUseComment(event.target.value);
    setUpdate(!update);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const toggleModal = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      {isModalOpen && (
        <Modal currentProduct={currentProduct} onClose={toggleModal} />
      )}

      <Row xs={1} sm={2} md={3} lg={4} className="g-4 mt-4 d-flex justify-content-center">
        {products.map((product, i) => (
          // <Col>
          <Card className="product-card shadow ">
            <Card.Img
              className="card-img-top mt-2"
              variant="top img-hover"
              onClick={() => toggleModal(product)}
              src={product.photo}
            />
            <Card.Body>
              <Card.Title className="card-title">{product.title}</Card.Title>
              <Card.Text className="card-price">$ {product.price.$numberDecimal}</Card.Text>
              {/* <Card.Text>Category: {product.category}</Card.Text> */}
              <Card.Text className="card-posted-at">
                Posted from {product.city} | {product.createdAt}
              </Card.Text>

              {/* <Card.Text>Description: {product.description}</Card.Text> */}
              {userState.loggedIn && (
                <>
                  <div className="commentForm panel panel-default mt-3">
                    <div className="commentBox panel-body">  
                      <form
                        className="row"
                        id="commentFormInput"
                        onSubmit={(e) => _addComment(e, product._id)}
                      >
                      <div className="row">
                        <div className="col-8">
                          <input
                            className="form-control-sm"
                            type="text"
                            onBlur={(e) => handleChange(e)}
                            placeholder="Say something here..."
                          ></input>
                        </div>
                        <div className="col-2">
                          <button className="btn mx-2" type="submit">
                            <FontAwesomeIcon icon={faComment} />
                          </button>
                      </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="mt-3 ">
                    <button
                      key={product._id}
                      className="btn col-5 mx-3"
                      onClick={() => _saveProduct(product._id)}
                    >
                      <FontAwesomeIcon icon={faHeart} /> Save
                    </button>

                    <a href={`mailto:${product.email}`}>
                      <button className="btn col-5" key={product._id}>
                        <FontAwesomeIcon icon={faEnvelope} /> Contact
                      </button>
                    </a>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
          // </Col>
        ))}
      </Row>
    </div>
  );
};

export default Products;
