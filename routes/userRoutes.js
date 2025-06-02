import express from 'express';
import { verifyToken } from "../middlewares/authMiddleware.js";
import  { authorizeRoles }  from "../middlewares/authorizeRoles.js";

const router = express.Router();

router.get("/employee", verifyToken, authorizeRoles("employer","employee"), (req,res) => {
    res.json({message: "Welcome employee"});
});

router.get("/employer", verifyToken,authorizeRoles("employer"), (req,res) => {
    res.json({message: "Welcome employer"});
});

export default router; 