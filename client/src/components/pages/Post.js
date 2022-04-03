import React, { useState } from 'react'

const getImageDetails = async function(url) {

  var apiUrl = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_API_URL}&image=${url}`;
  try {
    return fetch(apiUrl).then((response) => {
      return response.json()
    }).then((data) => {
      console.log(data);
      return data;
    })
  } catch (error) {
    console.log(error)
  }
}

const Post = () => {

  
  // states to grab user inputs
  const [title, setTitle] = useState();
  const [city, setCity] = useState();
  const[price, setPrice] = useState();
  const[description, setDescription] = useState();
  const[image, setImage] = useState();
  const [category, setCategory] = useState();
  const [isPending, setIsPending] = useState(false);

  // verification that user enters correct data.
  const handleChange = (e) => {
    if (e.target.name === 'price') {
      // checking for a string doesn't work blaahhhh
      if(e.target.value < 0 || e.target.value === String) {
        console.log('please enter a valid price');
      } else {
        console.log('price is acceptable');
      }
    } else if (e.target.name === 'Description') {
      console.log('all good')

    } else if (e.target.name === 'image') {
      console.log('all good')
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("category before", category);
    const item = { 
      title: title,
      photo: image, 
      description: description, 
      category: category,
      price: price,
      city: city,
      ownedBy: "6248e8b0b102111350421ec6"
    };

    setIsPending(true);

    const displayImage = await getImageDetails(item.photo);

    item.photo = displayImage.data.display_url;

    fetch('/api/products', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
      }).then(() => {
        console.log('new item posted')
        setIsPending(false);
      })
        .catch(() => {
          setIsPending(false);
        });
  }

  return (
    <section className="d-flex justify-content-around align-items-center p-5 height-150">
      <form className="card p-5" id ="contact-form red"
        onSubmit = {handleSubmit}>

        <h1 className= "text-center pb-4" data-testid='h1tag'>Post a New Item</h1>
        
        <label className="p-2" htmlFor="price">Price </label>
        <input className="m-2" 
          value ={price}
          onChange = {(e) => setPrice(e.target.value)}
          type="price" 
          name="price" 
          onBlur={handleChange}/>

        <label className="p-2" htmlFor="description" >Description: </label>
        <input className="m-2" 
          value ={description}
          onChange ={(e) => setDescription(e.target.value)}
          type="text" 
          name="description" 
          onBlur={handleChange}/>
        
        <label className="p-2" htmlFor="imageUrl">Img URL from imagery </label>
        <input className="m-2" 
          value ={image}
          onChange ={(e) => setImage(e.target.value)}
          type="text" 
          name="image" 
          onBlur={handleChange}/>

        <label className="p-2" htmlFor="Category">Category</label>
        <select className="m-2" 
          value = {category}
          onChange = {(e) => setCategory(e.target.value)}
          type="text" 
          name="category">
          
          <option value="" disabled selected> Choose a category... </option>
          <option value="books">books</option>
          <option value="junk">junk</option>
        </select>

        <label className="p-2" htmlFor="Category">Title</label>
        <input className="m-2" 
          value = {title}
          onChange = {(e) => setTitle(e.target.value)}
          type="text" 
          name="title"
          onBlur={handleChange}/>

        <label className="p-2" htmlFor="Category">City</label>
        <input className="m-2" 
          value = {city}
          onChange = {(e) => setCity(e.target.value)}
          type="text" 
          name="city"
          onBlur={handleChange}/>
          
        { !isPending && <button className="btn btn-primary m-2" >Submit</button>}
        { isPending && <button className="btn btn-primary m-2" disabled>Submitting Post...</button>}

      </form>
    </section>  
    )
}

export default Post