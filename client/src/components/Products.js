import React, { useState, useEffect, useContext } from "react";
import Modal from "./Modal";
import { Card, Row, Col } from "react-bootstrap";
import { UserContext } from "../contexts";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [useComment, setUseComment ] =useState('');
  const [update, setUpdate] = useState(false);
  const [ userState, dispatch ] = useContext(UserContext);

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
  }, [userState, useComment, update]);

  const _saveProduct = async  (e) => {

    console.log(userState)
    const response = await fetch(`/api/users/saves/${userState._id}`, {
      method : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productId: e
      })
    });
    if(!userState.loggedIn){
      alert('not logged in')
      return;
    }

    const data= await response.json();
    console.log(data)
    
  }
  

  const _addComment = async (productId) => {
    console.log(userState)
    const response = await fetch(`/api/comments/${productId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userState._id,
        commentBody: useComment
      })
    

    })
    if(!userState) {
      alert('not logged in')
    }
    const data = await response.json();
    console.log(data);
  };

  const handleChange= (event) => {
    event.preventDefault();
    setUseComment(event.target.value);
    setUpdate(!update);
};

  const [currentProduct, setCurrentProduct] = useState({});
  const toggleModal = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(!isModalOpen);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {isModalOpen && (
        <Modal currentProduct={currentProduct} onClose={toggleModal} />
      )}
      
      <Row xs={1} sm={2} md={3} className="g-4 mt-4">
        
        {products.map((product, i) => (
          <Col>
            <Card className="card-border shadow">
              <Card.Img variant="top" onClick={() => toggleModal(product)}
              src={product.photo} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>Category: {product.category}</Card.Text>
                <Card.Text>City: {product.city}</Card.Text>
                <Card.Text>$ {product.price.$numberDecimal}</Card.Text>
                <Card.Text>Description: {product.description}</Card.Text>
               {/* {product.comments.map((comment, i) => (
                <>
                    <Card.Text>{comment.commentBody}</Card.Text>
                    {comment.hasOwnProperty("userId") && (
                      <Card.Text>{comment.userId.username}</Card.Text> )}
                  </>
                ))} */}
                <div className = "commentForm panel panel-default">
                  <div className="commentBox panel-body">
                    <form className="form" onSubmit={() => _addComment(product._id)}>
                      <input className="form-control" type="text" onBlur={(e)=> handleChange(e)} placeholder="Say something here...">

                      </input>
                      <button className="btn m-2" type="submit"> Add comment </button>
                    </form>
                  </div>
                </div>
                <button key={product._id} className="btn m-2" onClick={()=> _saveProduct(product._id)} >Save for later</button>
                <button className="btn m-2">Contact</button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Products;
