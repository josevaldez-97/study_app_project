const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');

const ThemesPropertiesModel = sequelize.define('ThemesProperties', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false, primaryKey: true, autoIncrement: true,
    },
    theme_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    property_name: {
        type: DataTypes.STRING, allowNull: true
    },
    property_value: {
        type: DataTypes.STRING, allowNull: true
    }

}, {
    tableName: 'themes_properties',
    timestamps: false
});
module.exports = {
    ThemesPropertiesModel
}; 
