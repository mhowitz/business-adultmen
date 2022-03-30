import React from 'react'

const Post = () => {
  return (
    <section className="d-flex justify-content-around align-items-center p-5 bg-primary height-100">
      <form className="card p-5" id ="contact-form red">
        <h1 className= "text-center pb-4" data-testid='h1tag'>Post a New Item</h1>
        
        <label className="p-2" htmlFor="price">Price </label>
        <input className="m-2" type="price" name="price" />

        <label className="p-2" htmlFor="description">Description: </label>
        <input className="m-2" type="text" name="description"/>
        
        <label className="p-2" htmlFor="imageUrl">Img URL from imagery </label>
        <input className="m-2" type="text" name="imageUrl"/>

        <label className="p-2" htmlFor="Category">Category Drop Down</label>
        <input className="m-2" type="text" name="Category"/>

        <button className="btn btn-primary m-2">Submit</button>

      </form>
    </section>  
    )
}

export default Post