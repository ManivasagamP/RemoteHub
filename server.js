import express from 'express';
import dotenv from "dotenv";
import connectDB from './config/dbConnect.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB(); // connect to the database

const app = express();

// Middleware
app.use(express.json());

//Routes
app.use("/api/auth/", authRoutes);
app.use("/api/users/", userRoutes);

//Listening on a port
const Port = process.env.PORT || 3000;
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
}); 