
import { Router } from 'express'
import * as controller from '../controllers/main.js'
const router = Router()

router.get('/', controller.main)

export default router