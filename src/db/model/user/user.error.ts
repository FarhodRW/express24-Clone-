import { ErrorCodes, UserDefinedError } from "../../common/common.error";

export class UserError {
  static NotFound(data: any = null) {
    return new UserDefinedError(ErrorCodes.USERS, 'User with these details not found', data)
  }

  static AlreadyExists(data: any = null) {
    return new UserDefinedError(ErrorCodes.USERS, 'User with these details already exists', data)
  }
}
