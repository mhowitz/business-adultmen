const router = require('express').Router();

const {
  getUsers,
  createUser,
  getUser,
  saveProduct,
  getSavedProducts
} = require('../../controllers/user-controllers')

router
  .route('/')
  .get(getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser);

router
  .route('/saves/:id')
  .post(saveProduct)
  .get(getSavedProducts)

module.exports = router;