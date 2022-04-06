import React, { useState, useContext } from 'react'
import { UserContext } from "../../contexts/"



const getImageDetails = async function (url) {


  var apiUrl = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_API_URL}&image=${url}`;
  try {
    return fetch(apiUrl).then((response) => {
      return response.json()
    }).then((data) => {
      return data;
    })
  } catch (error) {
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
  let isSubmittable = (error.title && error.description && error.category && error.price && error.city)
  // verification that user enters correct data.

  const checkError = function () {
    if (error.city || error.price || error.description || error.title || error.category) {
      return false;
    }
    return true;
  }

  const handleChange = (e) => {
    console.log("userState", userState);
    // console.log("title error", error.title);
    // console.log("description error", error.description);
    // console.log("it worked!", isSubmittable)
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
        setIsPending(false);
        handlePageChange('Profile');
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
              onBlur={(e) => {
                if (e.target.value.length <= 100 && e.target.value.length >= 1) {
                  setPrice(e.target.value)
                  setError({ ...error, price: "" })
                }
                else {
                  setError({ ...error, price: "You need a price!" })
                }
              }}
              type="price"
              name="price"
            // onBlur={handleChange} 
            />
            {error.price ? (<p style={{ color: "red" }}>{error.price}</p>) : null}

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
            {error.description ? (<p style={{ color: "red" }}>{error.description}</p>) : null}

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
                  setTitle(e.target.value)
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
            {error.title ? (<p style={{ color: "red" }}>{error.title}</p>) : null}

            <label className="p-2" htmlFor="Category">City</label>
            <input className="m-2"
              value={city}
              // onChange={(e) => setCity(e.target.value)}
              onBlur={(e) => {
                if (e.target.value.length <= 25 && e.target.value.length >= 1) {
                  setCity(e.target.value)
                  setError({ ...error, title: "" })
                }
                else {
                  setError({ ...error, title: "You need a city" })
                }
              }}
              type="text"
              name="city"
            // onBlur={handleChange}
            />
            {error.city ? (<p style={{ color: "red" }}>{error.city}</p>) : null}

            {/* {(isSubmittable) && Object.values(error).reduce((total, current) => !total && !current) ? (
              isPending ? <button className="btn btn-primary m-2" disabled>Submitting Post...</button>
                : <button className="btn btn-primary m-2">Submit</button>
            ) : (
              <button className="btn btn-primary m-2" disabled>Submit</button>
            )} */}
            {!isPending && checkError() && <button className="btn m-2" >Submit</button>}
            {isPending && checkError() && <button className="btn m-2" disabled>Submitting Post...</button>}
            {!checkError() && <button className="btn m-2" disabled>Submit</button>}
            {/* {checkError() ? (
              <p>{error.description}</p>
            ) : null
            } */}
          </form>
        </section>
      )}
    </>
  )
}

export default Post