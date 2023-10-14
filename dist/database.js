"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startPostgresConnection = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("./config"));
exports.sequelize = new sequelize_1.Sequelize({
    dialect: 'postgres',
    username: config_1.default.POSTGRES_HOST_USER,
    host: config_1.default.POSTGRES_HOST,
    database: config_1.default.DB_NAME,
    password: config_1.default.POSTGRES_HOST_PWD
});
function startPostgresConnection() {
    console.log('Trying to connect Database... Wait please');
    return new Promise((resolve, reject) => {
        exports.sequelize.authenticate()
            .then(() => {
            console.log('Connected to the Database!');
            resolve(true);
        })
            .catch((error) => {
            reject(error);
        });
    });
}
exports.startPostgresConnection = startPostgresConnection;
