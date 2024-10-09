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

exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateArticle = async (req, res) => {
    try {
        const { title, content } = req.body;
        const article = await Article.findByPk(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        await article.update({ title, content });
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        await article.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
