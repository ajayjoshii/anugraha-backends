import "dotenv/config"
import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import pastoralRoutes from "./routes/pastoralRoutes.js"
import sermonRoutes from "./routes/sermonRoutes.js"
import path from "path";

import adminRoutes from "./routes/adminRoutes.js"
import { fileURLToPath } from "url";


import { seedAdmin } from "./controllers/adminController.js"

const app = express()
connectDB()
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    })
)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        message: "Church website API running"
    })
})

app.use("/api/pastoral", pastoralRoutes)
app.use("/api/sermons", sermonRoutes)
app.use("/api/admin", adminRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`)

    await seedAdmin()
})


