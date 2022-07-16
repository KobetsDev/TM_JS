
import { Router } from 'express'
import * as controller from '../controllers/groups.js'
const router = Router()

router.get('/', controller.getAll)

export default router