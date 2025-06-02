import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("Database connected !!")
        })
    } catch (error) {
        console.log("Database connection failed !!", error);
        process.exit(1);
    }
};

export default connectDB;