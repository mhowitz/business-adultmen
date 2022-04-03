import React, { useState, useEffect } from "react";
import Modal from './Modal';

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
    setCurrentPhoto(image)
    setIsModalOpen(!isModalOpen);
  }
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
            style={{ height: "500px", objectFit: "cover" }}
          >
              <h4>{product.title}</h4>
              <p>{product.category}</p>
              <img
                className="img-fluid"
                key={product.title}
                alt={product.title} 
                src={product.photo}
                onClick={() => toggleModal(product.photo)}
              >
              </img>
              {product.description}
              {product.price.$numberDecimal}
              {product.city}

              <button className="btn m-2">Save for later</button>
              <button className="btn m-2">Venmo!</button>
            
          </div>
        ))}
      </section>
    </div>
  );
};

export default Products;
