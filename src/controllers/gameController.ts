import { Request, Response } from 'express';
import { Op } from 'sequelize';
// Models
import Game from '../models/Game';
// Helpers
import splitResult from '../middleware/general/functions';

export const createGame = async (req: Request, res: Response) => {
  try {
    const {
      name,
      home_team,
      away_team,
      game_date,
      ubication,
      game_hour,
      result
    } = req.body;

    console.log(req.body);

    const gameData = {
      name,
      home_team,
      away_team,
      game_date,
      ubication,
      game_hour,
      result,
      score_home: null as number | null,
      score_away: null as number | null
    };

    if (result && result !== '') {
      const { scoreHome, scoreAway } = splitResult(result);
      gameData.score_home = scoreHome;
      gameData.score_away = scoreAway;
    }

    const game = await Game.create(gameData);

    return res.status(200).json({ data: game, status: 200, message: 'El juego ha sido registrado exitosamente.' });
  } catch (error) {
    return res.status(500).json({ message: 'El juego no se ha logrado crear.', status: 500 });
  }
};

export const updateGameBeforePlay = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const {
      name,
      home_team,
      away_team,
      game_date,
      ubication,
      game_hour,
      result
    } = req.body;

    const gameById = await Game.findByPk(gameId);

    if (!gameById) {
      return res.status(404).json({ message: 'El juego que intenta actualizar no se ha encontrado.', status: 404 });
    }

    const gameData = {
      name,
      home_team,
      away_team,
      game_date,
      ubication,
      game_hour,
      result,
      score_home: null as number | null,
      score_away: null as number | null
    };

    if (result && result !== '') {
      const { scoreHome, scoreAway } = splitResult(result);
      gameData.score_home = scoreHome;
      gameData.score_away = scoreAway;
    }

    const [affectedCount, gameUpdated] = await Game
      .update(gameData, { where: { id: gameById.id }, returning: true });

    if (affectedCount === 1) {
      return res.status(200).json({ data: gameUpdated[0], status: 200, message: 'El juego ha sido actualizado correctamente.' });
    }
    return res.status(400).json({ message: 'Error al actualizar el juego. ', status: 400 });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el juego. ', status: 500 });
  }
};

export const updateGameAfterPlay = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;

    const {
      name,
      result
    } = req.body;

    const gameById = await Game.findByPk(gameId);

    if (!gameById) {
      return res.status(404).json({ message: 'El juego que intenta actualizar no se ha encontrado.', status: 404 });
    }

    const gameData = {
      name,
      result,
      score_home: null as number | null,
      score_away: null as number | null
    };

    const { scoreHome, scoreAway } = splitResult(result);
    gameData.score_home = scoreHome;
    gameData.score_away = scoreAway;

    const [affectedCount, gameUpdated] = await Game
      .update(gameData, { where: { id: gameById.id }, returning: true });

    if (affectedCount === 1) {
      return res.status(200).json({ data: gameUpdated[0], status: 200, message: 'El juego ha sido actualizado correctamente.' });
    }
    return res.status(400).json({ message: 'Error al actualizar el juego. ', status: 400 });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el juego. ', status: 500 });
  }
};

export const getAllGames = async (req: Request, res: Response) => {
  try {
    const { searchKey } = req.query as { searchKey: string };

    const searchFields = ['name', 'home_team', 'away_team', 'ubication'];

    const searchCondition = {
      [Op.or]: [
        ...searchFields.map((field) => ({
          [field]: { [Op.like]: `%${searchKey}%` }
        }))
      ]
    };

    const games = await Game.findAll({ where: searchCondition });

    return res.status(200).json({ data: games, status: 200 });
  } catch (error) {
    return res.status(500).json({ message: 'Error al intentar obtener todos los juegos.', status: 500 });
  }
};

export const deleteGame = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;

    const gameById = await Game.findByPk(gameId);

    if (!gameById) {
      return res.status(404).json({ message: 'El juego que intenta eliminar no se ha encontrado.', status: 404 });
    }

    await gameById.destroy();

    return res.status(200).json({ message: 'El juego ha sido eliminado correctamente.', status: 200 });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el juego. ', status: 500 });
  }
};
