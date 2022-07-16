import ApiError from "../exceptions/api-error.js";
import tokenService from "../service/token-service.js";

export default function (req, res, next) {
    try {
        const auth_header = req.headers.authorization
        if (!auth_header) {
            return next(ApiError.UnauthorizedError())
        }

        const accessToken = auth_header.split(' ')[1]
        if (!accessToken) {
            return next(ApiError.UnauthorizedError())
        }

        const userData = tokenService.validateAccessToken(accessToken)
        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }
        req.user = userData

        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}