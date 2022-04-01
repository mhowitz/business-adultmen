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

  // useEffect(() => {
  //     (async () => {
  //        fetch('http://localhost:3001/api/products', {
  //             method: 'get',
  //             mode: 'no-cors',
  //         })
  //         .then((response) => {
  //             const res = await response.json()
  //             return res
  //             // setProducts(response)
  //         }).then((data) => {
  //             console.log(data);
  //         })
  //     })()
  // }, [])

//   useEffect(() => {
//     const newProducts = async () => {
//       const data = await fetch("http://localhost:3001/api/products", {
//           method: 'get',
//           mode: 'no-cors',
//       });
//       const json = await data.json();
//       setProducts(json);
//     };
//     newProducts()
//     .catch(console.error);
//   }, []);

// useEffect(() => {
//     async function newProducts() {
//         let response = await fetch("http://localhost:3001/api/products", {
//             method: 'get',
//             mode: 'no-cors',
//         })
//         response = await response.json()
//         setProducts(response)
//     }
//     newProducts()
//     .catch(console.error);
// }, [])

useEffect( () => {
    newProducts();
}, [])

const newProducts = async () => {
    fetch("http://localhost:3001/api/products")
    .then(response => response.json())
    .then(receivedData => setProducts(receivedData));
}

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
              {product.description}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Products;
