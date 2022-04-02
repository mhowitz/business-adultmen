const router = require('express').Router();

const {
  getUsers,
  createUser,
  getUser,
  userLogin,
  saveProduct,
  getSavedProducts,
  userLogout

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
  .route('/logout')
  .post(userLogout)

router
  .route('/saves/:id')
  .post(saveProduct)
  .get(getSavedProducts)

module.exports = router;