const router = require('express').Router();

const {
  getProducts,
  createProduct,
  getProduct,
  getProductsByCat,
  getProductsByCatAndPrice,
  deleteProduct
} = require('../../controllers/product-controllers')

router
  .route('/')
  .get(getProducts)
  .post(createProduct);

router
  .route('/:id')
  .get(getProduct)
  .post(deleteProduct);

router
  .route('/category/:name')
  .get(getProductsByCat);

router
  .route('/category/:name/price/:direction')
  .get(getProductsByCatAndPrice);

module.exports = router;