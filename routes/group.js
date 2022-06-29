
import { Router } from 'express'
import * as controller from '../controllers/group.js'
const router = Router()

router.get('/:group', controller.getByName)

router.get('/add/:group', controller.add)

export default router