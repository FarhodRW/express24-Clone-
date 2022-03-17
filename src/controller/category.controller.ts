import { success } from "../common/helper"
import { validateIt } from "../common/validation"
import { CategoryDto, CategoryDtoGroup } from "../db/dto/category.dto."

import { ErrorCodes, ErrorItems } from "../db/common/common.error"
import { categoryService } from "../service/category.service"

export async function createCategoryController(req, res, next) {
  try {
    if (req.body.parentId) req.body.isParent = true
    const dto = await validateIt(req.body, CategoryDto, CategoryDtoGroup.CREATE)
    const data = await categoryService.create(dto);
    success(res, data)
  } catch (error) {
    next(error)
  }
}




export async function updateCategoryController(req, res, next) {
  try {
    const id = req.params.id

    const dto = await validateIt(req.body, CategoryDto, CategoryDtoGroup.UPDATE)
    if (dto.parentId) dto.isParent = true
    const Category = await categoryService.updateById(id, dto)
    success(res, Category)
  } catch (error) {
    next(error)
  }
}

export async function deleteCategoryController(req, res, next) {
  try {
    const id = req.params.id
    console.log(id);

    const Category = await categoryService.deleteById(id, ErrorCodes.CATEGORIES, ErrorItems.CATEGORY,)
    success(res, 'success')
  } catch (error) {
    next(error)
  }
}


