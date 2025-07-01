const express = require('express');
const cors = require('cors');
const http = require('http');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authMiddleware = require('./middleware/authMiddleware');
const rateLimiter = require('./middleware/rateLimiter');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(authMiddleware);
const deployedURL = process.env.FRONTEND_DEPLOYED_URL;
const localURL = process.env.FRONTEND_LOCAL_URL;
app.use(cors({
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'PATCH'],
    origin: [deployedURL, localURL]
}));
app.use(rateLimiter);
app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

const server = http.createServer(app);
const port = process.env.PORT;
connectDB().then(() => 
    server.listen(port, () => console.log(`Server is listening at port ${port}`))
).catch((error) => console.log(`Server Error: ${error}`));

module.exports = app;