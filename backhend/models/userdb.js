import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        mobilenumber: {
            type: String,
            required: true,
            unique: true,
            match: [/^\d{10}$/, "Invalid phone number format"], // 10-digit validation
        },

        role: {
            type: String,
            enum: ["user", "admin", "superadmin"],
            default: "user",
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Users", userSchema);
