import PastoralTeam from "../models/PastoralTeam.js"

export const getPastoralTeams = async (req, res) => {
    try {
        const teams = await PastoralTeam.find().sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            data: teams
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}




export const createPastoralTeam = async (req, res) => {
    try {
        const { name, position, desc } = req.body

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        // const img = `/uploads/${req.file.filename}`;
        const img = req.file.path;


        const team = await PastoralTeam.create({
            name,
            position,
            img,
            desc
        })

        res.status(201).json({
            success: true,
            message: "Pastoral member created",
            data: team
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updatePastoralTeam = async (req, res) => {
    try {
        const team = await PastoralTeam.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if (!team) {
            return res.status(404).json({
                success: false,
                message: "Pastoral member not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Pastoral member updated",
            data: team
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deletePastoralTeam = async (req, res) => {
    try {
        const team = await PastoralTeam.findByIdAndDelete(req.params.id)

        if (!team) {
            return res.status(404).json({
                success: false,
                message: "Pastoral member not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Pastoral member deleted"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}