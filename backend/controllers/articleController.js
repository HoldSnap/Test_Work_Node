const { Article } = require('../models');

exports.createArticle = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newArticle = await Article.create({ title, content });
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.findAll();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
