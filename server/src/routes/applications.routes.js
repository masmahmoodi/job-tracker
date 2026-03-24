import {getApplications, postApplication,getApplication,patchApplication,delApplication} from "../controllers/applications.controller.js"
import {Router} from "express"
import {authenticateToken} from "../middleware/authMiddleware.js"
const router  = Router()
router.use(authenticateToken);

router.get("/" , getApplications)
router.post("/", postApplication)
router.get("/:id",getApplication)
router.patch("/:id",patchApplication)
router.delete("/:id", delApplication)
export default router 