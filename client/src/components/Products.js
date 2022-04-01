import React, { useState, useEffect } from "react";

const Products = () => {
  function fetchApi() {
    fetch("http://localhost:3001/api/products");
  }
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

  return (
    <div>
      <section className="flex-row d-flex mt-3">
        {products.map((product, i) => (
          <div
            key={i}
            className="card mx-3"
            style={{ height: "500px", objectFit: "cover" }}
          >
            <div>
              {product.name}
              {product.category}
              <img alt={product.name} src={product.photo}></img>
              {product.description}
              {product.price.$numberDecimal}
              {product.city}

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
