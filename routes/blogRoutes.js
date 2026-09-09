import express from "express"
import {
    getPastoralTeams,
    createPastoralTeam,
    updatePastoralTeam,
    deletePastoralTeam
} from "../controllers/blogController.js"
import { verifyAdmin } from "../middleware/authMiddleware.js"
import upload from "../middleware/upload.js";


const router = express.Router()

router.get("/", getPastoralTeams)
// router.post("/", verifyAdmin, createPastoralTeam)



router.post(
    "/", verifyAdmin,
    upload.single("img"),
    createPastoralTeam
);


router.put("/:id", verifyAdmin, updatePastoralTeam)
router.delete("/:id", verifyAdmin, deletePastoralTeam)

export default router