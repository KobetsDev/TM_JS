
import jwt from 'jsonwebtoken'
import TokenModel from '../models/Token.js'

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload,
            process.env.JWT_ACCESS_SECRET,
            {
                expiresIn: '30s'
            }
        )
        const refreshToken = jwt.sign(payload,
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: '30d'
            }
        )
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userDate = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userDate
        } catch (e) {
            return null
        }
    }
    validateRefreshToken(token) {
        try {
            const userDate = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userDate
        } catch (e) {
            return null
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenDate = await TokenModel.findOne({ user: userId })
        if (tokenDate) {
            tokenDate.refreshToken = refreshToken
            return tokenDate.save()
        }
        const token = await TokenModel.create({ user: userId, refreshToken })
        return token
    }

    async removeToken(refreshToken) {
        const tokenData = await TokenModel.deleteOne({ refreshToken })
        return tokenData
    }


    async findToken(refreshToken) {
        const tokenData = await TokenModel.findOne({ refreshToken })
        return tokenData
    }


}
export default new TokenService()