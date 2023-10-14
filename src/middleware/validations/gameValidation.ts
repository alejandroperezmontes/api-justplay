import { check } from 'express-validator';

export const resultFormatRegExp = /^\d+-\d+$/;

export const updateGameBeforePlayValidation = [
  check('gameId')
    .isInt()
    .withMessage('El parametro gameId es requerido y debe ser número.'),
  check('home_team')
    .not()
    .isEmpty()
    .isString()
    .withMessage('El equipo local es requerido y debe ser tipo texto.'),
  check('away_team')
    .not()
    .isEmpty()
    .isString()
    .withMessage('El equipo visitante es requerido y debe ser tipo texto.'),
  check('game_date')
    .not()
    .isEmpty()
    .withMessage('La fecha de juego es requerida.'),
  check('ubication')
    .not()
    .isEmpty()
    .isString()
    .withMessage('La ubicación es requerida y debe ser tipo texto.'),
  check('game_hour')
    .not()
    .isEmpty()
    .withMessage('La hora de juego es requerida.')
];

export const updateGameAfterPlayValidation = [
  check('result')
    .optional()
    .custom((value) => {
      if (value && value !== '' && !resultFormatRegExp.test(value)) {
        return false;
      }
      return true;
    })
    .withMessage('El formato del resultado debe ser numero-numero.')
];

export const createGameValidation = [
  check('home_team')
    .not()
    .isEmpty()
    .isString()
    .withMessage('El equipo local es requerido y debe ser tipo texto.'),
  check('away_team')
    .not()
    .isEmpty()
    .isString()
    .withMessage('El equipo visitante es requerido y debe ser tipo texto.'),
  check('game_date')
    .not()
    .isEmpty()
    .withMessage('La fecha de juego es requerida.'),
  check('ubication')
    .not()
    .isEmpty()
    .isString()
    .withMessage('La ubicación es requerida y debe ser tipo texto.'),
  check('game_hour')
    .not()
    .isEmpty()
    .withMessage('La hora de juego es requerida.'),
  check('result')
    .optional()
    .custom((value) => {
      if (value && value !== '' && !resultFormatRegExp.test(value)) {
        return false;
      }
      return true;
    })
    .withMessage('El formato del resultado debe ser numero-numero.'),
  check('score_home')
    .optional()
    .isNumeric()
    .withMessage('Los goles marcados por el equipo local debe ser numero.'),
  check('score_away')
    .optional()
    .isNumeric()
    .withMessage('Los goles marcados por el equipo visitante debe ser numero.')
];
