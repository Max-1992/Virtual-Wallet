import express, { Application } from 'express';
// import { container } from './container';

const app: Application = express();

app.get('/', (req, res) => {
    res.send('Arriba los Minions');
});

// const application = container.resolve("app");

export default app;