"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGameBeforePlayValidation = exports.createGameValidation = void 0;
const express_validator_1 = require("express-validator");
exports.createGameValidation = [
    (0, express_validator_1.body)('homeTeam')
        .not()
        .isEmpty()
        .withMessage('El equipo local es requerido'),
    (0, express_validator_1.body)('awayTeam')
        .not()
        .isEmpty()
        .withMessage('El equipo visitante es requerido')
];
exports.updateGameBeforePlayValidation = [];
