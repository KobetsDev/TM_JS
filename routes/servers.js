import { Router } from 'express'
import * as controller from '../controllers/servers.js'

const router = Router()

router.get('/api/lesson/add', controller.addLesson)
export default router
