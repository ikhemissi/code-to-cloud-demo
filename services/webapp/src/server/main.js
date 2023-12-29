import express from 'express';
import ViteExpress from 'vite-express';
import api from './api.js';

const app = express();

app.use(express.json());
app.use('/api', api);

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`Server is listening on port ${port}`)
);

ViteExpress.bind(app, server);

