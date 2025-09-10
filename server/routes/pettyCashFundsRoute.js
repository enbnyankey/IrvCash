import express from 'express';
import {getFunds , addFunds, getFundBalance, getUserFunds, updateFunds, deleteFunds} from '../controllers/pettyCashFund.js'

const router = express.Router();

router.get('/getFunds', getFunds);
router.post('/addFunds', addFunds);
router.get('/getFundBalance', getFundBalance);
router.get('/getUserFunds', getUserFunds);
router.post('/updateFunds', updateFunds);
router.delete('/deleteFunds', deleteFunds);


export default router;