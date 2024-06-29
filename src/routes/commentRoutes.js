const express = require('express');
const commentController = require('../controllers/commentController.js');
const router = express.Router();

router.post('/', commentController.createComment);
router.get('/:post_id', commentController.getCommentsByPostId);
router.delete('/:id', commentController.deleteComment);

module.exports = router;