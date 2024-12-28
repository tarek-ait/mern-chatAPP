import express from 'express';
import { signup,
    login,
    logout,
    updateProfile,
    checkAuth
 } from '../controllers/auth.controller.js';
 import { protectRoute } from '../middleware/auth.middleware.js';
 
const router  = express.Router();
router.post('/signup',signup )
router.post('/login', login)
router.post('/logout',logout )
// the protect to validate the JWT token 
router.put('/upate-profile',protectRoute ,updateProfile)
// whenever refreshing the application
router.get('/check', protectRoute, checkAuth)


export default router;