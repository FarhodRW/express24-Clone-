import { UserDefinedError } from "../db/common/common.error";
import { UserDto } from "../db/dto/user.dto";
import { UserModel } from "../db/model/user/user.model";
import { CommonService } from "./base.service";
import { Model } from 'mongoose';


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
}

export const userService = new UserService(UserModel);
