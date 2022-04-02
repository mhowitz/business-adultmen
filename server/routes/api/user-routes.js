const router = require('express').Router();

const {
  getUsers,
  createUser,
  getUser,
  userLogin,
  saveProduct,
  getSavedProducts,
  getOwnedProducts

} = require('../../controllers/user-controllers')

router
  .route('/')
  .get(getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser);


router 
  .route('/login')
  .post(userLogin);

router
  .route('/saves/:id')
  .post(saveProduct)
  .get(getSavedProducts)

router
  .route('/owned/:id')
  .get(getOwnedProducts);

module.exports = router;