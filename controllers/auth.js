
import jwt from 'jsonwebtoken'
import bcryp from 'bcryptjs'
import User from '../models/User.js'
import keys from '../config/keys.js'
import erroreHandler from '../utils/erroreHandler.js'

export async function login(req, res) {
    // res.status(200).json({
    //     login: {
    //         email: req.body.email,
    //         password: req.body.password
    //     }
    // })
    const candidate = await User.findOne({
        email: req.body.email
    })
    if (candidate) {
        const passwordResult = bcryp.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, { expiresIn: 60 * 60 })

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: 'Пароли не совпадают'
            })
        }
    } else {
        res.status(404).json({
            message: 'Пользователя с такой почтой нет'
        })
    }
}

export async function register(req, res) {

    // const user = new User({
    //     email: req.body.email,
    //     password: req.body.password
    // })

    // user.save().then(() => console.log('User crated'))

    const candidate = await User.findOne({ email: req.body.email })
    if (candidate) {
        res.status(409).json({
            message: 'Такой email уже занят'
        })
    } else {

        const salt = bcryp.genSaltSync(10)
        const password = req.body.password

        const user = new User({
            email: req.body.email,
            password: bcryp.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json({
                user
            })
        } catch (e) {
            erroreHandler(res, e)
        }

    }
}