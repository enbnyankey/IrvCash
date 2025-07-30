import express from 'express';
import {getFunds , addFunds, getFundBalance, getUserFunds} from '../controllers/pettyCashFund.js'

const router = express.Router();

router.get('/getFunds', getFunds);
router.post('/addFunds', addFunds);
router.get('/getFundBalance', getFundBalance);
router.get('/getUserFunds', getUserFunds)

export default router;