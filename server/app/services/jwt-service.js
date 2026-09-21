import jwt from 'jsonwebtoken'
import { prisma } from '../prisma/prisma.js'

class TokenService {

    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: '30d' })

        return { accessToken, refreshToken }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await prisma.token.findFirst({
            where: {
                userId
            }
        })
        if (tokenData) {
            const updatedToken = await prisma.token.update({
                where: {
                    id: tokenData.id
                }, data: {
                    refreshToken
                }
            })
            return refreshToken;
        }
        const newToken = await prisma.token.create({
            data: {
                userId,
                refreshToken,
            }
        })

        return newToken;

    }
    async removeToken(refreshToken) {
        const token = await prisma.token.deleteMany({ where: { refreshToken } })
        return token
    }


}

export default new TokenService;