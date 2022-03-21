import { success } from "../common/helper";
import { UserDefinedError } from "../db/common/common.error"


export async function uploadController(req, res) {

  if (!req.file) throw UserDefinedError.UnknownError('file upload error');
  success(res, req.file.path)
}