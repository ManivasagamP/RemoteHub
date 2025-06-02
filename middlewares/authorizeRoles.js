export const authorizeRoles = (...allowedRoles) => {
    return(req, res, next) => {
        if (!req.role || !req.role.role) {
            return res.status(403).json({ message: "Access denied" });
        }

        const userRole = req.role.role;

        console.log("User Role:", userRole);
        console.log("Allowed Roles:", allowedRoles);

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: "Access denied" });
        }

        next();
    }
}
