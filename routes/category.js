
import { Router } from 'express'
import * as controller from '../controllers/category.js'
import passport from 'passport'

const router = Router()


router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll)


router.get('/:id', controller.getById)


router.delete('/:id', controller.remove)


router.post('/', controller.create)


router.patch('/:id', controller.update)


export default router