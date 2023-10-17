"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
class Game extends sequelize_1.Model {
}
Game.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    home_team: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    away_team: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    game_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    ubication: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    game_hour: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false
    },
    result: {
        type: sequelize_1.DataTypes.STRING(20)
    },
    score_home: {
        type: sequelize_1.DataTypes.INTEGER
    },
    score_away: {
        type: sequelize_1.DataTypes.INTEGER
    },
    image: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'game',
    timestamps: false
});
exports.default = Game;
