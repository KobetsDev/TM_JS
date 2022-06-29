// import colors from 'colors'
// // const colors = require('colors')
// export function requestTime(req, res, next) {
//     req.requestTime = Date.now()
//     next()
// }

// export function logger(req, res, next) {
//     console.log(colors.green(`Req.time: ${req.requestTime} ${decodeURI(req.url)}`))
//     next()
// }
// import passport from 'passport'

import keys from '../config/keys.js'
import passportJwt from 'passport-jwt'
import mongoose from 'mongoose'
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt
const User = mongoose.model('User')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

export default passport1 => {
    passport1.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await User.findById(payload.userId).select('email id')
                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (e) {
                console.log(e)
            }
        })
    )
}