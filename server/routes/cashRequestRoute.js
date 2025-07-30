import express from 'express';
import { addRequest, deleteRequest, updateRequest, getAllRequests, rejectedRequest, approvedRequest} from '../controllers/cashRequests.js';

const router = express.Router();

router.post('/addRequest', addRequest);
router.delete('/deleteRequest', deleteRequest);
router.post('/updateRequest', updateRequest);
router.get('/getAllRequest', getAllRequests);
router.post('/rejectedRequest', rejectedRequest);
router.post('/approvedRequest', approvedRequest);


export default router;