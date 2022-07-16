
import { Router } from 'express'
import * as controller from '../controllers/faculties.js'

const router = Router()

router.get('/add', controller.addfaculties)

export default router