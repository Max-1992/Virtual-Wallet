// Import configured server.
import app from './server';

// Import path handler
import path from 'path';

// Import environment variable handler
import dotenv from 'dotenv';

// Set environment variables
dotenv.config({
    path: path.join(__dirname, `/../config/environments/${process.env.APP_ENV}.env`)
});

// Start server
app.listen(process.env.PORT, () => console.log(`Application is running on http://localhost:${process.env.PORT}`));