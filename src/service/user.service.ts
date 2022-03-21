import { UserDefinedError } from "../db/common/common.error";
import { UserDto } from "../db/dto/user.dto";
import { User, UserModel } from "../db/model/user/user.model";
import { CommonService } from "./base.service";
import { Model, FilterQuery } from 'mongoose';


class UserService<T> extends CommonService<T> {
  constructor(model: Model<T>) {
    super(model)
  }
  public async getAdminsService() {
    const query = {
      isAdmin: true,
      isDeleted: false
    }
    const admins = await this.model.find(query);

    return admins;
  }

  public async getUsersService(dto) {
    const { page, limit, search } = dto;

    let query: FilterQuery<User & Document> = {
      isDeleted: false,
      isAdmin: false
    }

    if (search) {
      query = {
        'name': {
          $regex: search,
          $options: 'i',
        }
      }
    }

    const $project = {
      $project: {
        password: 0,
      }
    }

    const $sort = {
      createdAt: -1
    }

    const pipeline = [$project];

    const data = await userService.findByPaging(query, page, limit, pipeline, $sort);
    console.log(data)
    return data;
  }
}

export const userService = new UserService(UserModel);
