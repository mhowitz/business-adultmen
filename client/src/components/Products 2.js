import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const Products = () => {
  const [products, setProducts] = useState([
    // {
    //     name: 'Park bench',
    //     category: 'landscape',
    //     description:
    //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie'
    //   },
    //   {
    //     name: 'Park bench',
    //     category: 'landscape',
    //     description:
    //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie'
    //   }
  ]);

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
  }, []);

  const [currentPhoto, setCurrentPhoto] = useState();
  const toggleModal = (image) => {
    setCurrentPhoto(image);
    setIsModalOpen(!isModalOpen);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {isModalOpen && (
        <Modal currentPhoto={currentPhoto} onClose={toggleModal} />
      )}
      <section className="flex-row d-flex mt-3">
        {products.map((product, i) => (
          <div
            key={i}
            className="card mx-3"
            style={{ height: "33vh", objectFit: "cover" }}>             
              
            <div>
              <img
                key={product.name}
                alt={product.name}
                src={product.photo}
                onClick={() => toggleModal(product.photo)}
                style={{ height: "20vh", width: "20vw" }}
                className="flex-row d-flex"
              ></img>
              <div className="card-body">
                <h4 className="card-title">{product.name}</h4>
                <h5>{product.category}</h5>
                <p className="card-text">{product.description}</p>
                <p>{product.price.$numberDecimal}</p>
                <p>{product.city}</p>
              </div>

              <button className="btn">Save for later</button>
              <button className="btn">Venmo!</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Products;
