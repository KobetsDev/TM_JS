
import { Router } from 'express'
import * as controller from '../controllers/office.js'
const router = Router()

router.get('/', controller.getAll)

router.post('/add', controller.add)

export default router