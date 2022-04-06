const router = require('express').Router();
const authMiddleware= require('../../utils/auth')
const {
    getComments,
    addComment,
    addReply,
    removeComment,
    removeReply,

} = require('../../controllers/comment-controller');

router.route('/').get(getComments)
router.route('/:productId', authMiddleware).post(addComment)

router.route('/product/:productId/reply/:commentId', authMiddleware).post(addReply)

router.route('/:productId/delete/:commentId', authMiddleware).delete(removeComment)

router.route('/:commentId/deletereply/:replyId', authMiddleware).delete(removeReply)

module.exports= router;