import { UserDefinedError } from "../db/common/common.error";
import { UserDto } from "../db/dto/user.dto";
import { UserError } from "../db/model/user/user.error";
import { UserModel } from "../db/model/user/user.model";

export async function createUserService(dto: UserDto) {
  const user = new UserModel(dto)
  await user.save()
  return user
}

export async function loginUserService(email) {
  const user = await UserModel.findOne({ email })
  if (!user) throw UserError.NotFound(email)
  return user
}

export async function getUserService(id) {
  const user = UserModel.findById(id, '-password')
  if (!user) throw UserError.NotFound(id)
  return user

}


export async function updateUserService(id, dto) {
  const user = await UserModel.findByIdAndUpdate(id, { $set: dto }, { new: true },)
  if (!user) throw UserError.NotFound()
  return user
}

export async function deleteUserService(id) {
  console.log(id)

  const user = UserModel.findByIdAndUpdate(id, { $set: { 'isDeleted': true } }, { new: true })

  if (!user) throw UserError.NotFound()
  return user

}