const router = require('express').Router();
const userRoutes = require('./user-routes');
const productRoutes = require('./product-routes');
const commentRoutes= require('./commemt-routes')

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/comments', commentRoutes)

module.exports = router;