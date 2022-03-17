import { CommonService } from "./base.service";
import { CategoryModel } from '../db/model/category/category.model'

class CategoryService<T> extends CommonService<T> {
}

export const categoryService = new CategoryService(CategoryModel)