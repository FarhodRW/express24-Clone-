import { success } from "../common/helper"
import { validateIt } from "../common/validation"
import { UserDto, UserDtoGroup } from "../db/dto/user.dto"
import { createUserService, deleteUserService, getUserService, loginUserService, updateUserService } from "../service/user.service"
import bcrypt from 'bcrypt'
import { UserError } from "../db/model/user/user.error"
import jwt from 'jsonwebtoken'

export async function createUserController(req, res, next) {
  try {
    const dto = await validateIt(req.body, UserDto, UserDtoGroup.REGISTER)
    dto.password = await bcrypt.hash(dto.password, 8)
    const user = await createUserService(dto)
    success(res, user)
  } catch (error) {
    next(error)
  }
}

export async function loginUserController(req, res, next) {
  try {
    const data = await validateIt(req.body, UserDto, UserDtoGroup.LOGIN)

    const user = await loginUserService(data.email)

    const compare = await bcrypt.compare(data.password, user.password)
    if (!compare) throw UserError.NotFound(data.email)
    const token = jwt.sign({ _id: user._id }, process.env.JWTUSERKEY)

    success(res, token)
  } catch (error) {
    next(error)
  }
}


export async function getUserProfileController(req, res, next) {
  try {
    const id = req.user._id
    console.log(id)
    const user = await getUserService(id)
    success(res, user)
  } catch (error) {
    next(error)
  }
}




export async function updateUserController(req, res, next) {
  try {
    const id = req.user._id
    const dto = await validateIt(req.body, UserDto, UserDtoGroup.UPDATE)
    console.log(dto)
    if (dto.password)
      dto.password = await bcrypt.hash(dto.password, 8)
    console.log(dto.password);

    const user = await updateUserService(id, dto)
    success(res, user)
  } catch (error) {
    next(error)
  }
}

export async function deleteUserController(req, res, next) {
  try {
    const id = req.user._id
    console.log(id);

    const user = await deleteUserService(id)
    success(res, 'success')
  } catch (error) {
    next(error)
  }
}
