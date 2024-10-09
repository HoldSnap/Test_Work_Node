const express = require('express');
const articleRoutes = require('./articleRoutes');
// const commentRoutes = require('./commentRoutes');

const router = express.Router();

router.use('/article', articleRoutes);

// router.use('/article/:articleId/comments', commentRoutes);

module.exports = router;
