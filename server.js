// import "dotenv/config"

// import express from "express"
// import cors from "cors"
// import connectDB from "./config/db.js"

// import pastoralRoutes from "./routes/pastoralRoutes.js"
// import sermonRoutes from "./routes/sermonRoutes.js"
// import adminRoutes from "./routes/adminRoutes.js"

// import { seedAdmin } from "./controllers/adminController.js"

// const app = express()




// connectDB()





// app.use(
//     cors({
//         origin: process.env.CLIENT_URL,
//         credentials: true
//     })
// )

// app.use(express.json())

// app.get("/", (req, res) => {
//     res.json({
//         message: "Church website API running"
//     })
// })

// app.use("/api/pastoral", pastoralRoutes)
// app.use("/api/sermons", sermonRoutes)
// app.use("/api/admin", adminRoutes)

// const PORT = process.env.PORT || 3001

// app.listen(PORT, async () => {
//     console.log(`Server running on port ${PORT}`)
//     console.log("EMAIL_USER:", process.env.EMAIL_USER)
//     console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "LOADED" : "NOT LOADED")

//     await seedAdmin()
// })


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
    "http://localhost:3000",
    "https://anugraha-frontend-beta.vercel.app"
]

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error("Not allowed by CORS"))
            }
        },
        credentials: true
    })
)

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Church website API running"
    })
})

app.use("/api/pastoral", pastoralRoutes)
app.use("/api/sermons", sermonRoutes)
app.use("/api/admin", adminRoutes)

connectDB()
    .then(async () => {
        console.log("MongoDB connected")

        try {
            await seedAdmin()
            console.log("Admin seed completed")
        } catch (error) {
            console.error("Admin seed error:", error.message)
        }
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error.message)
    })

export default app