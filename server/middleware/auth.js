import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Authorization header missing or invalid"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        // @ts-ignore
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        req.user = decoded;



        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

export default auth;
