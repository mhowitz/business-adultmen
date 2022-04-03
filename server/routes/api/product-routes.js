const router = require('express').Router();

const {
  getProducts,
  createProduct,
  getProduct,
  getProductsByCat,
  getProductsByCatAndPrice,
  deleteProduct,
  unSaveProduct
} = require('../../controllers/product-controllers');

const { authMiddleware } = require('../../utils/auth');

// router.use(authMiddleware)


router
  .route('/')
  .get(getProducts)

router.post('/', authMiddleware, createProduct);


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

router
  .route('/unSave/:id')
  .post(unSaveProduct);

module.exports = router;