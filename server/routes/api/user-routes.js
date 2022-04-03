const router = require('express').Router();

const {
  getUsers,
  createUser,
  getUser,
  userLogin,
  saveProduct,
  getSavedProducts,
  userLogout,
  getOwnedProducts


} = require('../../controllers/user-controllers');

const { authMiddleware } = require('../../utils/auth');

// router.use(authMiddleware);
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

// router.post('/logout', authMiddleware, userLogout)

router
  .route('/saves/:id', authMiddleware)
  .post(saveProduct)
  .get(getSavedProducts)

router
  .route('/owned/:id', authMiddleware)
  .get(getOwnedProducts);

module.exports = router;