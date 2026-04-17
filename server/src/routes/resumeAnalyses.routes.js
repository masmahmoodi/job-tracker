import {Router} from "express"
import {authenticateToken} from "../middleware/authMiddleware.js"
import analyzeApplicationResume from "../controllers/resumeAnalyses.controller.js"
const router  = Router()
router.use(authenticateToken);

router.post("/:id", analyzeApplicationResume)

export default router