"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameValidation_1 = require("../validations/gameValidation");
function splitResult(result) {
    if (!gameValidation_1.resultFormatRegExp.test(result)) {
        throw new Error('El resultado no está en el formato correcto.');
    }
    const [scoreHome, scoreAway] = result.split('-');
    return {
        scoreHome: parseInt(scoreHome, 10),
        scoreAway: parseInt(scoreAway, 10)
    };
}
exports.default = splitResult;
