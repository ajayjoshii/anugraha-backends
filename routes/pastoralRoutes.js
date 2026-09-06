import express from "express"
import {
    getPastoralTeams,
    createPastoralTeam,
    updatePastoralTeam,
    deletePastoralTeam
} from "../controllers/pastoralController.js"
import { verifyAdmin } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", getPastoralTeams)
router.post("/", verifyAdmin, createPastoralTeam)
router.put("/:id", verifyAdmin, updatePastoralTeam)
router.delete("/:id", verifyAdmin, deletePastoralTeam)

export default router