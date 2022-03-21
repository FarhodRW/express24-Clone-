import express from 'express'
import { uploadController } from '../controller/upload.controller'
import { upload } from '../middleware/upload'

const router = express.Router()

router.post('/', upload.single('file'), uploadController)

export default router
