import express from "express"
import {
    getSermons,
    createSermon,
    updateSermon,
    deleteSermon
} from "../controllers/sermonController.js"
import { verifyAdmin } from "../middleware/authMiddleware.js"
import upload from "../middleware/upload.js"

const router = express.Router()

router.get("/", getSermons)
// router.post("/", verifyAdmin, createSermon)


router.post(
    "/", verifyAdmin,
    upload.single("img"),
    createSermon
);


router.put("/:id", verifyAdmin, updateSermon)
router.delete("/:id", verifyAdmin, deleteSermon)

export default router