import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import config from './config';
import { startPostgresConnection } from './database';

// Routes
import gameRoutes from './routes/gameRoute';

const port = config.PORT;
const app: Express = express();

const corsConfig: CorsOptions = {
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE']
};

app.use(cors(corsConfig));

startPostgresConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());

app.get('/status', async (req, res) => {
  res.status(200).json({ message: 'El server esta OK con version 1.1' });
});

app.use('/game', gameRoutes);
