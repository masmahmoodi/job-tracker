import {getApplications, postApplication,getApplication,patchApplication,delApplication} from "../controllers/applications.controller.js"
import {Router} from "express"

const router  = Router()

router.get("/" , getApplications)
router.post("/", postApplication)
router.get("/:id",getApplication)
router.patch("/:id",patchApplication)
router.delete("/:id", delApplication)
export default router 