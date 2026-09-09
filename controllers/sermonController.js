import Sermon from "../models/Sermon.js"

export const getSermons = async (req, res) => {
    try {
        const sermons = await Sermon.find().sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            data: sermons
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const createSermon = async (req, res) => {
    try {
        const {
            name,
            sub,
            pastor,

            button
        } = req.body


        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        const img = `/uploads/${req.file.filename}`;

        const sermon = await Sermon.create({
            name,
            sub,
            pastor,
            img,
            button
        })

        res.status(201).json({
            success: true,
            message: "Sermon created",
            data: sermon
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateSermon = async (req, res) => {
    try {
        const sermon = await Sermon.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if (!sermon) {
            return res.status(404).json({
                success: false,
                message: "Sermon not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Sermon updated",
            data: sermon
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteSermon = async (req, res) => {
    try {
        const sermon = await Sermon.findByIdAndDelete(req.params.id)

        if (!sermon) {
            return res.status(404).json({
                success: false,
                message: "Sermon not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Sermon deleted"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}