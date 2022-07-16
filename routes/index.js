
import { Router } from 'express'
import UserController from '../controllers/user-controller.mjs'
import { body } from 'express-validator'
import auth from '../middlewares/auth.js'

const router = Router()

router.post('/login', UserController.login)
router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 8, max: 16 }),
    UserController.registration)
router.post('/logout', UserController.logout)
router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)
router.get('/users', auth, UserController.getUsers)

export default router