import { success } from "../common/helper"
import { validateIt } from "../common/validation"
import { MenuDto, MenuDtoGroup, MenuGetDto } from "../db/dto/menu.dto"

import { ErrorCodes, ErrorItems } from "../db/common/common.error"
import { menuService } from "../service/menu.service"

export async function createMenuController(req, res, next) {
  try {

    if (req.body.parentId) req.body.isParent = true
    const dto = await validateIt(req.body, MenuDto, MenuDtoGroup.CREATE)
    dto.createdBy = req.user._id
    const data = await menuService.create(dto);
    success(res, data)
  } catch (error) {
    next(error)
  }
}




export async function updateMenuController(req, res, next) {
  try {
    const id = req.params.id

    const dto = await validateIt(req.body, MenuDto, MenuDtoGroup.UPDATE)
    dto.createdBy = req.user._id
    const menu = await menuService.updateById(id, dto)
    success(res, menu)
  } catch (error) {
    next(error)
  }
}

export async function deleteMenuController(req, res, next) {
  try {
    const id = req.params.id
    console.log(id);

    const menu = await menuService.deleteById(id, ErrorCodes.MENUS, ErrorItems.MENU)
    success(res, 'success')
  } catch (error) {
    next(error)
  }
}


// export async function getMenuPagingController(req, res, next) {
//   try {
//     const data = await validateIt(req.body, MenuGetDto, MenuDtoGroupMenuDtoGroup.GET_PAGING);

//     const categories = await getMenuPagingService(data)

//     success(res, categories)
//   } catch (error) {
//     next(error)
//   }
// }