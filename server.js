require('dotenv').config();
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const helmet = require('helmet');
const connectDB = require('./config/db');
const createCors = require('./config/cors');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(helmet());
app.use(express.json());

const PORT = process.env.PORT || 3000;
connectDB(process.env.MONGO_URI);

app.use(createCors(process.env.CORS_ORIGINS));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

app.get('/', (req, res) => res.send('Task Manager API running'));


app.use(errorHandler);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
