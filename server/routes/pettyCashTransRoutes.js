import express from 'express';
import {getAllCashTrans, getCashTrans,getAllfundReconciliation,getfundReconciliation, addfundReconciliation, deletefundReconciliation, deleteCashTrans} from '../controllers/pettyCashTrans.js';
const router = express.Router();


router.get('/getAllCashTrans', getAllCashTrans);
router.get('/getCashTrans', getCashTrans);
router.get('/getAllfundReconciliation', getAllfundReconciliation);
router.delete('/deleteCashTrans', deleteCashTrans)
router.get('/getfundReconciliation', getfundReconciliation);
router.post('/addfundReconciliation', addfundReconciliation);
router.delete('/deletefundReconciliation', deletefundReconciliation);


export default router;



