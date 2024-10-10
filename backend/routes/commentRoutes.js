const express = require('express');
const commentController = require('../controllers/commentController');

const router = express.Router({ mergeParams: true });

router.post('/', commentController.createComment);

router.get('/', commentController.getAllComments);

router.patch('/:id', commentController.updateComment);

router.delete('/:id', commentController.deleteComment);

module.exports = router;