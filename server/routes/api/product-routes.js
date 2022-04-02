const router = require('express').Router();

const {
  getProducts,
  createProduct,
  getProduct,
  getProductsByCat,
  getProductsByCatAndPrice
} = require('../../controllers/product-controllers');
const { authMiddleware } = require('../../utils/auth');

// const jwt = require('jsonwebtoken');

// const secret = 'mysecretsshhhhh';
// const expiration = '2h';
// const protectedRouter = authMiddleware(router);
router.use(authMiddleware)

router
  .route('/')
  .get(getProducts)
  .post(createProduct);



router
  .route('/:productId')
  .get(getProduct);

router
  .route('/category/:name')
  .get(getProductsByCat);

router
  .route('/category/:name/price/:direction')
  .get(getProductsByCatAndPrice);

module.exports = router;