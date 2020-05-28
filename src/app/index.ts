import express from 'express';

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

  return server

}