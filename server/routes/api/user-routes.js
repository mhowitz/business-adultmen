const router = require('express').Router();

const {
  getUsers,
  createUser,
  getUser
} = require('../../controllers/user-controllers')

router
  .route('/')
  .get(getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser);

module.exports = router;