import express from 'express';
import {signup, login, forgotPassword, resetPassword, getAllUsers, deleteUser, updateUserProfile} from '../controllers/UserAuth/user_auth.js'
const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);    
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword', resetPassword);
router.get('/getAllUsers', getAllUsers); 
router.post('/deleteUser', deleteUser);
router.post('/updateUserProfile', updateUserProfile);


export default router;



