import express from 'express'
import { createAdminController, getAdminsController, getUsersController, loginAdminController } from '../controller/admin.controller'
import { createUserController, deleteUserController, getUserProfileController, loginUserController, updateUserController } from '../controller/user.controller'
import { verifyAdmin, verifyAdminToken, verifySuperAdmin } from '../middleware/adminAuth'
import { verifyUserToken } from '../middleware/userAuth'

const router = express.Router()

router.post('/create', verifyAdminToken, verifySuperAdmin, createAdminController)
router.post('/login', loginAdminController)
router.get('/admins', verifyAdminToken, verifySuperAdmin, getAdminsController)
router.post('/users', verifyAdminToken, verifyAdmin, getUsersController)




export default router