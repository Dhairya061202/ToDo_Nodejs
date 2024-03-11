import  express  from "express";
// import { User } from "../models/user.js";
import {  getMyProfile, loginUser, registerUser, logoutUser } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";


const router = express.Router();



router.post('/new', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)


router.get('/me', isAuthenticated , getMyProfile)



export default router