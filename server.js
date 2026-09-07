import "dotenv/config"

import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"

import pastoralRoutes from "./routes/pastoralRoutes.js"
import sermonRoutes from "./routes/sermonRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"

import { seedAdmin } from "./controllers/adminController.js"

const app = express()


const allowedOrigins = [
    "http://localhost:5173",
    "https://anugraha-frontend-beta.vercel.app"
];




connectDB()



app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://anugraha-frontend-beta.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());


// app.use(
//     cors({
//         origin: process.env.CLIENT_URL,
//         credentials: true
//     })
// )

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
    console.log("EMAIL_USER:", process.env.EMAIL_USER)
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "LOADED" : "NOT LOADED")

    await seedAdmin()
})