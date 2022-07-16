
import userService from "../service/user-service.js";
import { validationResult } from 'express-validator'
import ApiError from "../exceptions/api-error.js";

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const { name, email, password } = req.body;
            const user_data = await userService.registration(name, email, password)

            res.cookie('refreshToken', user_data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(user_data)
        } catch (e) {
            next(e)
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user_data = await userService.login(email, password)
            res.cookie('refreshToken', user_data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(user_data)
        } catch (e) {
            next(e)
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }
    async activate(req, res, next) {
        console.log('qwe')
        try {
            const activatinLink = req.params.link
            await userService.activate(activatinLink)
            return res.redirect(process.env.API_URL)
        } catch (e) {
            next(e)
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            // console.log(refreshToken)
            const user_data = await userService.refresh(refreshToken)
            res.cookie('refreshToken', user_data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(user_data)

        } catch (e) {
            next(e)
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await userService.get_all_users()
            res.json(users)
        } catch (e) {
            next(e)
        }
    }
}
export default new UserController()
// export default UserController
// export default class UserController
// exports.UserController = UserController