import {getApplications, postApplication,getApplication} from "../controllers/applications.controller.js"
import {Router} from "express"

const router  = Router()

router.get("/" , getApplications)
router.post("/", postApplication)
router.get("/:id",getApplication)
export default router 