const router = require('express').Router();

const {
  getUsers,
  createUser,
  getUser,
  userLogin
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

  
module.exports = router;