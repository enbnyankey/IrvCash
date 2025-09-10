import express from 'express';
import { getAllExpenses, addExpense, deleteExpense, updateExpense} from '../controllers/categoryExpense.js';

const router = express.Router();


router.post('/addExpense', addExpense);
router.get('/getAllExpenses', getAllExpenses);
router.post('/deleteExpense', deleteExpense);
router.put('/updateExpense', updateExpense);



export default router;


