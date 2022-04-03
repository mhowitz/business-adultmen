import React, { useState, useEffect, useContext } from "react";
// import Slider from "react-slick";
import Products from "../Products";
import { UserContext } from "../../contexts"

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
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      setOwnedProducts(response);
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
      setSavedProducts(response);
    }
    _savedProducts().catch(console.error);
  }, []);

  
 
  // pull up a modal when user clicks photo
 
  // change page to post page when title clicked
  
  return (



    <>
      <section className=" vh-100">
        {/* top bar */}
        <div className ="wrapper mt-4">
          <Products/>
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
        </div>

        {/* bottom bar */}
        <div className ="wrapper">
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
        </div>
        
      </section>
    </>
  )
}

export default Profile