const { DataTypes, INTEGER } = require('sequelize');
const { sequelize } = require('../../connection');

const TopicsModel = sequelize.define('Topics', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false, primaryKey: true, autoIncrement: true,
    },
    create_date: {
        type: DataTypes.DATE, allowNull: true
    },
    name: {
        type: DataTypes.STRING, allowNull: true
    },
    topic_id: {
        type: DataTypes.INTEGER, allowNull: true
    },
    order: {
        type: DataTypes.INTEGER, allowNull: true
    },
    priority: {
        type: DataTypes.INTEGER, allowNull: true
    },
    color: {
        type: DataTypes.STRING, allowNull: true
    },
    owner_user_id: {
        type: DataTypes.INTEGER, allowNull: true
    }

}, {
    tableName: 'topics',
    timestamps: false
});
module.exports = {
    TopicsModel
};  
