import jwt from 'jsonwebtoken'


export async function authenticate(req, res, next) {
    const token = req.cookies.refreshToken;
    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
        req.user = {
            id: payload.id,
            email: payload.email,
        }
        next();
    } catch (e) {
        return res.status(401).json({ message: "Invalid token" })
    }
}