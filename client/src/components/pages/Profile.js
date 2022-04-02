import React, { Component } from "react";
// import Slider from "react-slick";

const Profile = () => {

  // fetch routes to un-save items
 
  // pull up a modal when user clicks photo
 
  // change page to post page when title clicked
  
  return (
    <>
      <section className=" vh-100">
        {/* top bar */}
        <div className ="wrapper mt-4">
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