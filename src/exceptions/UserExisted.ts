import HttpException from './HttpException';
import { ErrorCodes } from './errorCode';

class UserExisted extends HttpException {
  constructor() {
    const errorDetail = ErrorCodes.USER_EXISTED;
    super(400, errorDetail.MESSAGE, errorDetail.CODE);
  }
}

export default UserExisted;
