import { Sequelize } from 'sequelize';
import config from './config';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  username: config.POSTGRES_HOST_USER,
  host: config.POSTGRES_HOST,
  database: config.DB_NAME,
  password: config.POSTGRES_HOST_PWD
});

export function startPostgresConnection() {
  console.log('Trying to connect Database... Wait please');

  return new Promise((resolve, reject) => {
    sequelize.authenticate()
      .then(() => {
        console.log('Connected to the Database!');
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
