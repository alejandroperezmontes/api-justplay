import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';

class Game extends Model {
  public id!: number;

  public name!: string;

  public home_team!: string;

  public away_team!: string;

  public game_date!: Date;

  public ubication!: String;

  public game_hour!: Date;

  public result?: string;

  public score_home?: number;

  public score_away?: number;

  public image?: string;
}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    home_team: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    away_team: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    game_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ubication: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    game_hour: {
      type: DataTypes.TIME,
      allowNull: false
    },
    result: {
      type: DataTypes.STRING(20)
    },
    score_home: {
      type: DataTypes.INTEGER
    },
    score_away: {
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'game',
    timestamps: false
  }
);

export default Game;
