import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["employee", "employer"],
        default: "employee"
    }
}, {
    timestamps: true
});

export default mongoose.model("User", userSchema);