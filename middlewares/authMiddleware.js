import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    let token;

    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        if (!token) {
            res.status(401).json({ message: "Invalid token" })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.role = decoded;
            next();

        } catch (error) {
            res.status(401).json({ message: "Invalid token" })
        }
    } else {
        res.status(401).json({ message: "No token provided" })
    }
};