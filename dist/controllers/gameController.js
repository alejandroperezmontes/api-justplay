"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGame = exports.getAllGames = exports.updateGameAfterPlay = exports.updateGameBeforePlay = exports.createGame = void 0;
const sequelize_1 = require("sequelize");
// Models
const Game_1 = __importDefault(require("../models/Game"));
// Helpers
const functions_1 = __importDefault(require("../middleware/general/functions"));
const createGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, home_team, away_team, game_date, ubication, game_hour, result } = req.body;
        const gameData = {
            name,
            home_team,
            away_team,
            game_date,
            ubication,
            game_hour,
            result,
            score_home: null,
            score_away: null
        };
        if (result && result !== '') {
            const { scoreHome, scoreAway } = (0, functions_1.default)(result);
            gameData.score_home = scoreHome;
            gameData.score_away = scoreAway;
        }
        const game = yield Game_1.default.create(gameData);
        return res.status(200).json({ data: game, status: 200, message: 'El juego ha sido registrado exitosamente.' });
    }
    catch (error) {
        return res.status(500).json({ message: 'El juego no se ha logrado crear.', status: 500 });
    }
});
exports.createGame = createGame;
const updateGameBeforePlay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gameId } = req.params;
        const { name, home_team, away_team, game_date, ubication, game_hour } = req.body;
        const gameById = yield Game_1.default.findByPk(gameId);
        if (!gameById) {
            return res.status(404).json({ message: 'El juego que intenta actualizar no se ha encontrado.', status: 404 });
        }
        if (gameById.result)
            return res.status(400).json({ message: 'No puede actualizar un juego que ya tiene resultado.', status: 400 });
        const [affectedCount, gameUpdated] = yield Game_1.default.update({
            name,
            home_team,
            away_team,
            game_date,
            game_hour,
            ubication
        }, { where: { id: gameById.id }, returning: true });
        if (affectedCount === 1) {
            return res.status(200).json({ data: gameUpdated[0], status: 200 });
        }
        return res.status(400).json({ message: 'Error al actualizar el juego. ', status: 400 });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el juego. ', status: 500 });
    }
});
exports.updateGameBeforePlay = updateGameBeforePlay;
const updateGameAfterPlay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gameId } = req.params;
        const { name, result } = req.body;
        const gameById = yield Game_1.default.findByPk(gameId);
        if (!gameById) {
            return res.status(404).json({ message: 'El juego que intenta actualizar no se ha encontrado.', status: 404 });
        }
        const gameData = {
            name,
            result,
            score_home: null,
            score_away: null
        };
        const { scoreHome, scoreAway } = (0, functions_1.default)(result);
        gameData.score_home = scoreHome;
        gameData.score_away = scoreAway;
        const [affectedCount, gameUpdated] = yield Game_1.default
            .update(gameData, { where: { id: gameById.id }, returning: true });
        if (affectedCount === 1) {
            return res.status(200).json({ data: gameUpdated[0], status: 200 });
        }
        return res.status(400).json({ message: 'Error al actualizar el juego. ', status: 400 });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el juego. ', status: 500 });
    }
});
exports.updateGameAfterPlay = updateGameAfterPlay;
const getAllGames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchKey } = req.query;
        const searchFields = ['name', 'home_team', 'away_team', 'ubication'];
        const searchCondition = {
            [sequelize_1.Op.or]: [
                ...searchFields.map((field) => ({
                    [field]: { [sequelize_1.Op.like]: `%${searchKey}%` }
                }))
            ]
        };
        const games = yield Game_1.default.findAll({ where: searchCondition });
        return res.status(200).json({ data: games, status: 200 });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al intentar obtener todos los juegos.', status: 500 });
    }
});
exports.getAllGames = getAllGames;
const deleteGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gameId } = req.params;
        const gameById = yield Game_1.default.findByPk(gameId);
        if (!gameById) {
            return res.status(404).json({ message: 'El juego que intenta eliminar no se ha encontrado.', status: 404 });
        }
        yield gameById.destroy();
        return res.status(200).json({ message: 'El juego ha sido eliminado correctamente.', status: 200 });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el juego. ', status: 500 });
    }
});
exports.deleteGame = deleteGame;
