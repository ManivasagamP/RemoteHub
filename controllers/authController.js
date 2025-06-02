import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js"

export const register = async(req, res) => {
    const { email , password , role} = req.body;
 
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({email, password:hashedPassword, role});
        await newUser.save();

        res.status(201).json({message: "User registered successfully"});
    } catch (error) {
        console.error("Error during registration : ", error);
        res.status(500).json({message: "Internal server error"})
    }
};

export const login = async(req, res) => {
    const { email , password } = req.body;

    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message: `User with this ${email} dosn't exist`});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({id:user._id, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );

        res.status(200).json(
            {
                token
            }
        );

    } catch (error) {
        console.error("Error duting registration : ", error);
        res.status(500).json({message: "Internal server error"})
    }
};
