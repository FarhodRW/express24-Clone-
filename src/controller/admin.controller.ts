import { success } from "../common/helper"
import { validateIt } from "../common/validation"
import { UserDto, UserDtoGroup, UserGetDto } from "../db/dto/user.dto"
import { userService } from "../service/user.service"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ErrorCodes, ErrorItems, UserDefinedError } from "../db/common/common.error"

export async function createAdminController(req, res, next) {

  try {
    const dto = await validateIt(req.body, UserDto, UserDtoGroup.REGISTER)
    dto.isAdmin = true
    dto.createdBy = req.user._id
    dto.password = await bcrypt.hash(dto.password, 8)
    const newUser = await userService.create(dto)
    success(res, newUser)
  } catch (err) {
    next(err)
  }
}

export async function loginAdminController(req, res, next) {
  try {
    const data = await validateIt(req.body, UserDto, UserDtoGroup.LOGIN)

    const user = await userService.findByQuery(data.email, ErrorCodes.USERS, ErrorItems.USER)
    if (!user.isAdmin) throw UserDefinedError.NotEnoughPermission(user)
    const compare = await bcrypt.compare(data.password, user.password)
    if (!compare) throw UserDefinedError.NotFound(data.email, ErrorItems.USER, ErrorCodes.USERS,)
    const token = jwt.sign({ _id: user._id }, process.env.JWTADMINKEY)
    success(res, { user, token })
  } catch (error) {
    next(error)
  }
}


export async function getUsersController(req, res, next) {
  try {
    const id = req.user._id
    console.log(id)
    const dto = await validateIt(req.body, UserGetDto, UserDtoGroup.GET_PAGING)
    const user = await userService.getUsersService(dto)
    success(res, user)
  } catch (error) {
    next(error)
  }
}





export async function getAdminsController(req, res, next) {

  try {
    const admins = await userService.getAdminsService()
    success(res, admins)
  } catch (error) {
    next(error)
  }

}

// export async function deleteAdminController(req, res, next) {
//   try {
//     const id = req.params.id

//     const user = await userService.updateById(id, { isAdmin: false })
//     success(res, 'success')
//   } catch (error) {
//     next(error)
//   }
// }