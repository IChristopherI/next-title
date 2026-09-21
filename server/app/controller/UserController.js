import { prisma } from "../prisma/prisma.js";
import userService from "../services/user-service.js";

class UserController {
    async registration(req, res) {
        try {
            const { email, password, name } = req.body;
            const data = await userService.registration(email, password, name);
            res.cookie('refreshToken', data.tokens.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,

            })

            return res.json({
                user: data.user,
                access: data.tokens.accessToken,
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: "message error" })
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const data = await userService.login(email, password);
            res.cookie('refreshToken', data.tokens.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,

            })
            return res.json(data)
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: "message error" })
        }
    }

    async getAll(req, res) {
        try {
            const users = await prisma.user.findMany({ orderBy: { id: "asc" }});
            return res.json(users);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
    async requireAdmin(req, res) {
        const user = await prisma.user.findUnique({
            where: { id: req.userId }, select: { Role: true }

        })
        if (!user || user.Role !== "ADMIN") {
            return res.json(403).json({message: "Forbidden"})
        }
    }
    async logout(req, res) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: 'Server error' })
        }
    }
    async activate() {

    }

    async checkAuth(req, res) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: req.user.id
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    Role: true,
                },
            });

            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            return  res.json({ user });
        } catch (e) {

            console.log(e)
            return res.status(500).json({ message: 'Server error' })
        }
    }
}

export default new UserController();
