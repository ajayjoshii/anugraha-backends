import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import Admin from "../models/Admin.js"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export const seedAdmin = async () => {
    try {
        const existingAdmin = await Admin.findOne({
            email: process.env.ADMIN_EMAIL
        })

        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(
                process.env.ADMIN_PASSWORD,
                10
            )

            await Admin.create({
                email: process.env.ADMIN_EMAIL,
                password: hashedPassword
            })

            console.log("Default admin created")
        }
    } catch (error) {
        console.error("Admin seed error:", error.message)
    }
}

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const admin = await Admin.findOne({ email })

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const validPassword = await bcrypt.compare(
            password,
            admin.password
        )

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const otp = crypto.randomInt(100000, 999999).toString()

        admin.otp = otp
        admin.otpExpire = Date.now() + 5 * 60 * 1000

        await admin.save()

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: admin.email,
            subject: "Admin Login OTP",
            text: `Your admin login OTP is ${otp}. It expires in 5 minutes.`
        })

        res.status(200).json({
            success: true,
            message: "OTP sent to admin email"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const verifyAdminOTP = async (req, res) => {
    try {
        const { email, otp } = req.body

        const admin = await Admin.findOne({ email })

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            })
        }

        if (
            !admin.otp ||
            admin.otp !== otp ||
            admin.otpExpire < Date.now()
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP"
            })
        }

        admin.otp = undefined
        admin.otpExpire = undefined

        await admin.save()

        const token = jwt.sign(
            {
                id: admin._id,
                email: admin.email,
                role: "admin"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        )

        res.status(200).json({
            success: true,
            message: "Admin login successful",
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}