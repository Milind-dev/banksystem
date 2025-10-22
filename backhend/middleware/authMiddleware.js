import jwt from "jsonwebtoken";

export const protect = (roles = []) => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) return res.status(401).json({ error: "Not authorized" });

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ error: "Forbidden: insufficient role" });
            }

            next();
        } catch (err) {
            res.status(401).json({ error: "Invalid or expired token" });
        }
    };
};
