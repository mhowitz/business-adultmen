import React, { useState, useContext } from 'react'
import { UserContext } from "../../contexts/"



const getImageDetails = async function (url) {


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

const Post = ({ handlePageChange }) => {

  const [userState, dispatch] = useContext(UserContext);

  // states to grab user inputs
  const [title, setTitle] = useState();
  const [city, setCity] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [category, setCategory] = useState("books");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState({
    // price: "",
    description: "",
    // image:,
    // category: "",
    title: "",
    // city: ""
  });
  // verification that user enters correct data.
  const handleChange = (e) => {
    console.log("userState", userState);
    if (e.target.name === 'price') {
      // checking for a string doesn't work blaahhhh
      if (e.target.value < 0 || e.target.value === String) {
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

    console.log("userState", userState);
    console.log("id", userState._id);
    console.log("category before", category);
    const item = {
      title: title,
      photo: image,
      description: description,
      category: category,
      price: price,
      city: city,
      // hard coded till we have login tokens working
      ownedBy: userState._id
    };

    setIsPending(true);

    const displayImage = await getImageDetails(item.photo);

    item.photo = displayImage.data.display_url;

    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }).then(() => {
      console.log('new item posted')
      setIsPending(false);
      handlePageChange('Profile');
      console.log('we made it past page change fxn')
      setError("");
    })
      .catch(() => {
        setIsPending(false);
      });
  }

  return (
    <>
      {!userState.loggedIn && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "75vh" }}>
          <h1 className="text-danger">please log in to view your posts!</h1>
        </div>
      )}
      {userState.loggedIn && (
        <section className="d-flex justify-content-around align-items-center p-5 height-150">

          <form className="card-border card p-5" id="contact-form red"

            onSubmit={handleSubmit}>

            <h1 className="text-center pb-4" data-testid='h1tag'>Post a New Item</h1>

            <label className="p-2" htmlFor="price">Price </label>
            <input className="m-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="price"
              name="price"
              onBlur={handleChange} />

            <label className="p-2" htmlFor="description" >Description: </label>
            <input className="m-2"
              value={description}
              onBlur={(e) => {
                if (e.target.value.length <= 100 && e.target.value.length >= 4) {
                  setDescription(e.target.value)
                  setError({ ...error, description: "" })
                }
                else {
                  setError({ ...error, description: "Description needs to be between 4 and 100 characters!" })
                }
              }}
              type="text"
              name="description"
            // onBlur={handleChange}
            />
            {error.description ? (<p>{error.description}</p>) : null}

            <label className="p-2" htmlFor="imageUrl">Img URL from imagery </label>
            <input className="m-2"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              type="text"
              name="image"
              onBlur={handleChange} />

            <label className="p-2" htmlFor="Category">Category</label>
            <select className="m-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              name="category">

              <option value="" disabled selected> Choose a category... </option>
              <option value="books">books</option>
              <option value="junk">junk</option>
            </select>

            <label className="p-2" htmlFor="Category">Title</label>
            <input className="m-2"
              value={title}
              // onChange={(e) => setTitle(e.target.value)}
              onBlur={(e) => {
                if (e.target.value.length <= 25 && e.target.value.length >= 1) {
                  setDescription(e.target.value)
                  setError({ ...error, title: "" })
                }
                else {
                  setError({ ...error, title: "You need a title!" })
                }
              }}
              type="text"
              name="title"
              // onBlur={handleChange}
              />
              {error.title ? (<p>{error.title}</p>) : null}

            <label className="p-2" htmlFor="Category">City</label>
            <input className="m-2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              name="city"
              onBlur={handleChange} />
            {(title && description && category && price && city) && Object.values(error).reduce((total, current) => !total && !current) ? (
              isPending ? <button className="btn btn-primary m-2" disabled>Submitting Post...</button>
                : <button className="btn btn-primary m-2">Submit</button>
            ) : (
              <button className="btn btn-primary m-2" disabled>Submit</button>
            )}
            {/* { !isPending && !error.description && <button className="btn btn-primary m-2" >Submit</button>}
        { isPending && !error.description && <button className="btn btn-primary m-2" disabled>Submitting Post...</button>}
        {error.description && <button className="btn btn-primary m-2" disabled>Submit</button>} */}
            {error.description ? (
              <p>{error.description}</p>
            ) : null
            }
          </form>
        </section>
      )}
    </>
  )
}

export default Post