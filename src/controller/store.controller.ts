import { success } from "../common/helper"
import { validateIt } from "../common/validation"
import { StoreDto, StoreDtoGroup, StoreGetDto } from "../db/dto/store.dto"

import { ErrorCodes, ErrorItems } from "../db/common/common.error"
import { storeService } from "../service/store.service"

export async function createStoreController(req, res, next) {
  try {

    const dto = await validateIt(req.body, StoreDto, StoreDtoGroup.CREATE)
    dto.createdBy = req.user._id
    const data = await storeService.create(dto);
    success(res, data)
  } catch (error) {
    next(error)
  }
}




export async function updateStoreController(req, res, next) {
  try {
    const id = req.params.id

    const dto = await validateIt(req.body, StoreDto, StoreDtoGroup.UPDATE)
    dto.createdBy = req.user._id
    const store = await storeService.updateById(id, dto)
    success(res, store)
  } catch (error) {
    next(error)
  }
}

export async function deleteStoreController(req, res, next) {
  try {
    const id = req.params.id
    const store = await storeService.deleteById(id, ErrorCodes.STORES, ErrorItems.STORE,)
    success(res, 'success')
  } catch (error) {
    next(error)
  }
}
