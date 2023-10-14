import { Router } from 'express';
import * as GameController from '../controllers/gameController';
import { createGameValidation, updateGameBeforePlayValidation, updateGameAfterPlayValidation } from '../middleware/validations/gameValidation';
import validate from '../middleware/validations/validator';

const router = Router();

router.get('/all', GameController.getAllGames);
router.post('/create', createGameValidation, validate, GameController.createGame);
router.put('/update/before-play/:gameId', updateGameBeforePlayValidation, validate, GameController.updateGameBeforePlay);
router.put('/update/after-play/:gameId', updateGameAfterPlayValidation, validate, GameController.updateGameAfterPlay);
router.delete('/delete/:gameId', GameController.deleteGame);

export default router;
