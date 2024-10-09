// controllers/analyticController.js

const { Comment, Article, Op } = require('../models');

exports.getCommentsByPeriod = async (req, res) => {
    const { dateFrom, dateTo } = req.query;

    try {
        const comments = await Comment.findAll({
            where: {
                createdAt: {
                    [Op.between]: [new Date(dateFrom), new Date(dateTo)]
                }
            },
            include: [
                {
                    model: Article,
                    attributes: ['id', 'title']
                }
            ],
            group: ['Article.id', 'Comment.id']
        });

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
