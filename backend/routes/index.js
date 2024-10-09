const express = require('express');
const articleRoutes = require('./articleRoutes');
const commentRoutes = require('./commentRoutes');
const analyticRoutes = require('./analyticRoutes');

const router = express.Router();

router.use('/article', articleRoutes);

router.use('/article/:articleId/comments', commentRoutes);

router.use('/analytic', analyticRoutes);


module.exports = router;
