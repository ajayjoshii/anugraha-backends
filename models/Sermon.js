import mongoose from "mongoose"

const sermonSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        sub: {
            type: String,
            required: true
        },
        pastor: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        button: {
            type: String,
            default: "Watch Sermon"
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Sermon", sermonSchema)