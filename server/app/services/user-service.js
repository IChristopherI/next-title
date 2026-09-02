import { prisma } from "../prisma/prisma.js";
import bcrypt from "bcryptjs";
import TokenService from "./jwt-token.js"
import { randomUUID } from "crypto";
import mailService from "./mail-service.js";
class UserService {
    async registration(email, password, name) {
        const candidate = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (candidate) {
            throw new Error(`Пользователь c такой почтой ${email} уже существует`);
        }

        const hashpassword = await bcrypt.hash(password, 10);
        const activationLink = randomUUID()
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashpassword,
                activationLink
            }
        })
        await mailService.sendActivationMail(email, `${process.env.API_URL}/activate/:${activationLink}`)
        const tokens = await TokenService.generateTokens({ id: user.id, email: user.email })
        await TokenService.saveToken(user.id, tokens.refreshToken)
        return {
            user: {
                name: user.name,
                id: user.id,
                email: user.email,
                activationLink
            },
            tokens
        }

    }

    async login(email, password) {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (!user) {
            throw new Error(`Пользователя с почтой ${email} не существует`)
        }

        const isValidPass = await bcrypt.compare(password, user.password)

        if (!isValidPass) {
            throw new Error("Пароли не совпадают")

        }
        const tokens = await TokenService.generateTokens({ id: user.id, email: user.email })
        await TokenService.saveToken(user.id, tokens.refreshToken)
        return {
            user: {
                name: user.name,
                id: user.id,
                email: user.email,
            },
            tokens
        }
    }
    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken)
        return token;
    }

   
}

export default new UserService();
