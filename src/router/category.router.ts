import express from 'express'
import { createCategoryController, deleteCategoryController, updateCategoryController } from '../controller/category.controller'
import { verifyUserToken } from '../middleware/authorizaton'

const router = express.Router()

router.post('/create', createCategoryController)
router.put('/update/:id', updateCategoryController)
router.delete('/delete/:id', deleteCategoryController)





export default router