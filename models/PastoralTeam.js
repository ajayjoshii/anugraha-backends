import mongoose from "mongoose"

const pastoralTeamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("PastoralTeam", pastoralTeamSchema)