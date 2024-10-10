const { Comment } = require('../models');

exports.createComment = async (req, res) => {
    try {
        const { text } = req.body;
        const { articleId } = req.params;  
        if (!text) {
            return res.status(400).json({ message: 'required' });
        }
        const newComment = await Comment.create({ text, articleId });
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllComments = async (req, res) => {
    try {
        const { articleId } = req.params;  
        const comments = await Comment.findAll({ where: { articleId } });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCommentById = async (req, res) => {
    try {
        const { articleId, id } = req.params;  
        const comment = await Comment.findOne({ where: { id, articleId } });
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const { articleId, id } = req.params;  
        const { text } = req.body;
        const comment = await Comment.findOne({ where: { id, articleId } });
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        await comment.update({ text });
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const { articleId, id } = req.params; 
        const comment = await Comment.findOne({ where: { id, articleId } });
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        await comment.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
