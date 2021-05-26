import app from './server';

import path from 'path';
import dotenv from 'dotenv';
dotenv.config({
    path: path.join(__dirname, `/../config/environments/${process.env.APP_ENV}.env`)
});


app.listen(process.env.PORT, () => console.log(`Application is running on http://localhost:${process.env.PORT}`));