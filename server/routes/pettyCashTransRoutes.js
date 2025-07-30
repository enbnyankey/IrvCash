import express from 'express';
import {getAllCashTrans, getCashTrans,getAllfundReconciliation,getfundReconciliation } from '../controllers/pettyCashTrans.js';
const router = express.Router();


router.get('/getAllCashTrans', getAllCashTrans);
router.get('/getCashTrans', getCashTrans);
router.get('/getAllfundReconciliation', getAllfundReconciliation);
router.get('/getfundReconciliation', getfundReconciliation);


export default router;



