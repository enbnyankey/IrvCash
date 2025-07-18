import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pgConnectionConfig from './utils/pgConnection.js';
import sendEmailRoute from './routes/sendEmailRoute.js';
import userAuthRoute from './routes/userAuthRoutes.js';
import CategoryExpenseRoute from './routes/CategoryExpenseRoute.js';
import CashRequestRoute from './routes/cashRequestRoute.js';

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing middleware (express.json() is sufficient for modern Express)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test PostgreSQL connection
const testPgConnection = async() => {
    try {
        const client = await pgConnectionConfig.connect();
        console.log('PostgreSQL connected successfully');
    } catch(error) {
        console.error('Error connecting to PostgreSQL:', error);
        throw error;
    }
}
testPgConnection();

// Debug middleware - remove this after fixing the issue
app.use((req, res, next) => {
console.log('Request method:', req.method);
    console.log('Request URL:', req.url);
    console.log('Request body:', req.body);
    console.log('Content-Type:', req.get('Content-Type'));
    next();
});


// Routes
app.use('/sendEmailNotifications', sendEmailRoute);
app.use('/userAuth', userAuthRoute);
app.use('/categoryExpense',CategoryExpenseRoute);
app.use('/CashRequest',CashRequestRoute);

const servePort = process.env.SERVER_PORT || 3000;
app.listen(servePort, () => {
    console.log(`Server is running on Port ${servePort}`);
});