module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        articleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Articles',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        }
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.Article, {
            foreignKey: 'articleId',
            onDelete: 'CASCADE'
        });
    };

    return Comment;
};
