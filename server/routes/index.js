const router = require('express').Router();
// Import all of the API routes from /api/index.js (no need for index.js though since it's implied)
const apiRoutes = require('./api');
const path = require('path')
// add prefix of `/api` to all of the api routes imported from the `api` directory
router.use('/api', apiRoutes);

router.get('*', (rerq, res) => {
  res.sendFile(path.join(__dirname, '../client/build'))
} );

// router.use((req, res) => {
//   res.status(404).send('<h1>😝 404 Error!</h1>');
// });

module.exports = router;