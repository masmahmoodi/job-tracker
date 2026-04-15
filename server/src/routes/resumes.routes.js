import {Router} from "express"
import uploadResume from "../controllers/resumes.controller.js"
import upload from "../config/multer.js"
import {authenticateToken}  from "../middleware/authMiddleware.js"


const router = Router()

router.use(authenticateToken)

router.post("/upload", upload.single("resume"), uploadResume)

export default router