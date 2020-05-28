import express from 'express';
import indexRouter from './routes';
import { Model } from 'objection'
import * as config from '../knex';
class App {
  private app: Express.Application

  constructor(app: Express.Application) {
    this.app = app;
  }

  public callback() {
    return this.app;
  }
}

export function createServer() {
  const app: express.Application = express();
  const server = new App(app);

  Model.knex(config.default);

  // Middlewares
  app.use(express.json());

  // Routes
  app.use('/api', indexRouter);
  return server

}