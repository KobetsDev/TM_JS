
import { Router } from 'express'
import * as controller from '../controllers/auth.js'
const router = Router()

// /api/auth/login
router.post('/login', controller.login)

// /api/auth/register
router.post('/register', controller.register)

export default router