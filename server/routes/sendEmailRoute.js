import express from 'express';
import { sendBathEmailNotification, sendSingleEmailNotification } from '../controllers/sendEmailController.js';
const sendEmailRoute = express.Router();

sendEmailRoute.post('/sendBathEmailNotification', (req, res) => {
    sendBathEmailNotification(req, res);
});

sendEmailRoute.post('/sendSingleEmailNotification', (req, res) => {
    sendSingleEmailNotification(req, res);
});

export default sendEmailRoute;