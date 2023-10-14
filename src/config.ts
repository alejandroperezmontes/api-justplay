import * as dotenv from 'dotenv';

dotenv.config();

interface ConfigurationType {
    POSTGRES_HOST: string
    POSTGRES_HOST_USER: string
    POSTGRES_HOST_PWD: string
    DB_NAME: string
    PORT: string
    DB_PORT: string
}

const config:ConfigurationType = {
  POSTGRES_HOST: process.env.POSTGRES_HOST || '',
  POSTGRES_HOST_USER: process.env.POSTGRES_HOST_USER || '',
  POSTGRES_HOST_PWD: process.env.POSTGRES_HOST_PWD || '',
  DB_NAME: process.env.DB_NAME || '',
  DB_PORT: process.env.DB_PORT || '',
  PORT: process.env.PORT || ''
};

export default config;
