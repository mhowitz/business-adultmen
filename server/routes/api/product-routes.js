const router = require('express').Router();

const {
  getProducts,
  createProduct,
  getProduct
} = require('../../controllers/product-controllers')

router
  .route('/')
  .get(getProducts)
  .post(createProduct);

router
  .route('/:productId')
  .get(getProduct);

module.exports = router;