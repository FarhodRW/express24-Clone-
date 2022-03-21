import { CommonService } from "./base.service";
import { CollectionNames } from "../db/common/common.model";
import { Types, FilterQuery, Document, Model } from 'mongoose'
import { Menu, MenuModel } from "../db/model/menu /menu.model";

class MenuService<T> extends CommonService<T> {
  constructor(model: Model<T>) {
    super(model)
  }

}

export async function getMenuPagingService(dto) {
  const { page, limit, search, isTop, parentId } = dto
  let query: FilterQuery<Menu & Document> = {
    isDeleted: false
  }
  if (isTop) {
    query.parentId = {
      $exists: false
    }
  } else if (parentId) {
    query.parentId = new Types.ObjectId(parentId)
  }
  if (search) {
    query = {
      'title': {
        $regex: search,
        $options: 'i',
      }
    }
  }

  const $lookupParent = {
    $lookup: {
      from: CollectionNames.CATEGORIES,
      localField: 'parentId',
      foreignField: '_id',
      as: 'parent'
    }
  }

  const $unwindParent = {
    $unwind: {
      path: '$parent',
      preserveNullAndEmptyArrays: true
    }
  }

  const $project = {
    $project: {
      _id: 1,
      title: 1,
      parent: {
        _id: 1,
        title: 1
      },
      image: 1
    }
  }

  const $sort = {
    title: 1
  }
}
//   const pipeline = [$lookupParent, $unwindParent, $project];
//   const data = await MenuService.findByPaging(query, page, limit, pipeline, $sort)
//   return data
// }

export const menuService = new MenuService(MenuModel)