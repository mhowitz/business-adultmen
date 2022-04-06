import React, {useState, useContext, useEffect} from 'react';
import { Card} from "react-bootstrap";
import { UserContext } from "../contexts";
function Modal({ onClose, currentProduct }) {
  const [ userState, dispatch ] = useContext(UserContext);
  const [useComment, setUseComment ] =useState('');
  const [update, setUpdate] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    newProducts().catch(console.error);
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
    console.log(response);
    setProducts(response);
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
    newProducts();
  };
  const handleChange= (event) => {
    event.preventDefault();
    setUseComment(event.target.value);
    setUpdate(!update);
};

  return (
    <div className="modalBackdrop">
      <div className="modalContainer d-flex flex-column align-items-center justify-content-center">
        {/* <h3 className="modalTitle">{name}</h3> */}
        <img src={currentProduct.photo} alt="current category" />
        <div className = "commentForm panel panel-default">
                  <div className="commentBox panel-body">
                    <form className="form" onSubmit={() => _addComment(currentProduct._id)}>
                      <input className="form-control" type="text" onBlur={(e)=> handleChange(e)} placeholder="Say something here...">

                      </input>
                      <button className="btn m-2" type="submit"> Add comment </button>
                    </form>
                  </div>
                </div>
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