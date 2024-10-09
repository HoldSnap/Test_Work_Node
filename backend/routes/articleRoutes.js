const express = require('express');
const articleController = require('../controllers/articleController');

const router = express.Router();

router.post('/', articleController.createArticle);

router.get('/', articleController.getAllArticles);

router.get('/:id', articleController.getArticleById);

router.patch('/:id', articleController.updateArticle);

router.delete('/:id', articleController.deleteArticle);

module.exports = router;
