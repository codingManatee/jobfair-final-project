const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config({path:'./config/config.env'});

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({SUCCESS: true, message: 'Welcome to the server'});
    }
);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log('Server is running in', process.env.NODE_ENV , 'mode on port', PORT);
}
);  
