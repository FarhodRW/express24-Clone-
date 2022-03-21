import express from 'express'
import { createMenuController, deleteMenuController, updateMenuController } from '../controller/menu.controller'
import { verifyAdminToken } from '../middleware/adminAuth'

const router = express.Router()

router.post('/create', verifyAdminToken, createMenuController)
router.put('/update/:id', verifyAdminToken, updateMenuController)
router.delete('/delete/:id', verifyAdminToken, deleteMenuController)
// router.post('/', getMenuPagingController)





export default router