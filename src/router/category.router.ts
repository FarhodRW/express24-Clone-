import express from 'express'
import { createCategoryController, deleteCategoryController, getCategoryPagingController, updateCategoryController } from '../controller/category.controller'
import { verifyAdminToken } from '../middleware/adminAuth'

const router = express.Router()

router.post('/create', verifyAdminToken, createCategoryController)
router.put('/update/:id', verifyAdminToken, updateCategoryController)
router.delete('/delete/:id', verifyAdminToken, deleteCategoryController)
router.post('/', getCategoryPagingController)





export default router