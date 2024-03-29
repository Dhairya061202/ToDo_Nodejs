import  express  from "express";
import { newtask, getMyTask, updateTask, deleteTask } from "../controllers/task.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post('/new', isAuthenticated , newtask)
router.get('/my', isAuthenticated , getMyTask)

router.route('/:id').put(isAuthenticated, updateTask).delete(isAuthenticated,deleteTask)

export default router;