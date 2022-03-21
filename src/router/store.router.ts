import express from 'express'
import { createStoreController, deleteStoreController, updateStoreController } from '../controller/store.controller'
import { verifyAdminToken } from '../middleware/adminAuth'

const router = express.Router()

router.post('/create', verifyAdminToken, createStoreController)
router.put('/update/:id', verifyAdminToken, updateStoreController)
router.delete('/delete/:id', verifyAdminToken, deleteStoreController)
// router.post('/', getStorePagingController)





export default router