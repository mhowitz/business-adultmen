const router = require('express').Router();
const authMiddleware= require('../../utils/auth')
const {
    getComments,
    addComment,
    addReply,
    removeComment,

} = require('../../controllers/comment-controller');

router.route('/').get(getComments)
router.route('/:userId/product/:productId', authMiddleware).post(addComment)

router.route('/:userId/product/:productId/:commentId').post(addReply)

router.route('/:productId/delete/:commentId').delete(removeComment)

module.exports= router;