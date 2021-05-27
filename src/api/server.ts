// Import Express
import express, { Application } from 'express';

// Import awilix-express
import { loadControllers } from 'awilix-express';

// Import Dependency Invert Container
import loadContainer from './container';

// Create app
const app: Application = express();

// Load Dependency Invert Container
loadContainer(app);

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Load controllers
app.use(loadControllers('controllers/*.ts', {cwd: __dirname}));

export default app;