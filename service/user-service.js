import UserModel from "../models/User.js"
import bcrypt from 'bcryptjs'
import * as uuid from 'uuid'
import mailServide from "./mail-service.js"
import tokenService from "./token-service.js"
import UserDto from '../dtos/user-dto.js'
// import User from "../models/User.js"
import apiError from "../exceptions/api-error.js"
import ApiError from "../exceptions/api-error.js"

class UserService {
    async registration(name, email, password) {
        const candidate = await UserModel.findOne({ email: email })
        if (candidate) {
            throw apiError.BadRequest(`Пользователь с почтой ${email} уже существует`)
        }
        const hash_password = await bcrypt.hash(password, 5)
        const activatinLink = uuid.v4()
        const user = await UserModel.create({
            name,
            email,
            password: hash_password,
            activatinLink: activatinLink
        })
        await mailServide.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activatinLink}`)
        const user_dto = new UserDto(user)
        const tokens = tokenService.generateToken({ ...user_dto })
        await tokenService.saveToken(user_dto.id, tokens.refreshToken)
        return {
            ...tokens,
            user: user_dto
        }
    }

    async activate(activationLink) {
        console.log('qwe')
        const user = await UserModel.findOne({ activationLink })
        if (!user) {
            throw apiError.BadRequest('Некоректная ссылка активации')
        }
        user.isActivated = true
        await user.save()
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email })
        if (!user) {
            throw apiError.BadRequest(`Пользователь с таким email не был найден`)
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw apiError.BadRequest(`Некоректный пароль`)
        }
        const user_dto = new UserDto(user)
        const tokens = tokenService.generateToken({ ...user_dto })
        await tokenService.saveToken(user_dto.id, tokens.refreshToken)
        return {
            ...tokens,
            user: user_dto
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()

        }
        const user = await UserModel.findById(userData.id)
        const user_dto = new UserDto(user)
        const tokens = tokenService.generateToken({ ...user_dto })
        await tokenService.saveToken(user_dto.id, tokens.refreshToken)
        return {
            ...tokens,
            user: user_dto
        }
    }
    async get_all_users() {
        const users = UserModel.find()
        return users
    }
}

export default new UserService()