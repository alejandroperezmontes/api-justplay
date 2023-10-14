"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGameValidation = exports.updateGameAfterPlayValidation = exports.updateGameBeforePlayValidation = exports.resultFormatRegExp = void 0;
const express_validator_1 = require("express-validator");
exports.resultFormatRegExp = /^\d+-\d+$/;
exports.updateGameBeforePlayValidation = [
    (0, express_validator_1.check)('gameId')
        .isInt()
        .withMessage('El parametro gameId es requerido y debe ser número.'),
    (0, express_validator_1.check)('home_team')
        .not()
        .isEmpty()
        .isString()
        .withMessage('El equipo local es requerido y debe ser tipo texto.'),
    (0, express_validator_1.check)('away_team')
        .not()
        .isEmpty()
        .isString()
        .withMessage('El equipo visitante es requerido y debe ser tipo texto.'),
    (0, express_validator_1.check)('game_date')
        .not()
        .isEmpty()
        .withMessage('La fecha de juego es requerida.'),
    (0, express_validator_1.check)('ubication')
        .not()
        .isEmpty()
        .isString()
        .withMessage('La ubicación es requerida y debe ser tipo texto.'),
    (0, express_validator_1.check)('game_hour')
        .not()
        .isEmpty()
        .withMessage('La hora de juego es requerida.')
];
exports.updateGameAfterPlayValidation = [
    (0, express_validator_1.check)('result')
        .optional()
        .custom((value) => {
        if (value && value !== '' && !exports.resultFormatRegExp.test(value)) {
            return false;
        }
        return true;
    })
        .withMessage('El formato del resultado debe ser numero-numero.')
];
exports.createGameValidation = [
    (0, express_validator_1.check)('home_team')
        .not()
        .isEmpty()
        .isString()
        .withMessage('El equipo local es requerido y debe ser tipo texto.'),
    (0, express_validator_1.check)('away_team')
        .not()
        .isEmpty()
        .isString()
        .withMessage('El equipo visitante es requerido y debe ser tipo texto.'),
    (0, express_validator_1.check)('game_date')
        .not()
        .isEmpty()
        .withMessage('La fecha de juego es requerida.'),
    (0, express_validator_1.check)('ubication')
        .not()
        .isEmpty()
        .isString()
        .withMessage('La ubicación es requerida y debe ser tipo texto.'),
    (0, express_validator_1.check)('game_hour')
        .not()
        .isEmpty()
        .withMessage('La hora de juego es requerida.'),
    (0, express_validator_1.check)('result')
        .optional()
        .custom((value) => {
        if (value && value !== '' && !exports.resultFormatRegExp.test(value)) {
            return false;
        }
        return true;
    })
        .withMessage('El formato del resultado debe ser numero-numero.'),
    (0, express_validator_1.check)('score_home')
        .optional()
        .isNumeric()
        .withMessage('Los goles marcados por el equipo local debe ser numero.'),
    (0, express_validator_1.check)('score_away')
        .optional()
        .isNumeric()
        .withMessage('Los goles marcados por el equipo visitante debe ser numero.')
];
