import express from "express"
import {
    getSermons,
    createSermon,
    updateSermon,
    deleteSermon
} from "../controllers/sermonController.js"
import { verifyAdmin } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", getSermons)
router.post("/", verifyAdmin, createSermon)
router.put("/:id", verifyAdmin, updateSermon)
router.delete("/:id", verifyAdmin, deleteSermon)

export default router