import HttpException from './HttpException';
import { ErrorCodes } from './errorCode';

class UserNotFound extends HttpException {
  constructor() {
    const errorDetail = ErrorCodes.USER_NOT_FOUND;
    super(404, errorDetail.MESSAGE, errorDetail.CODE);
  }
}

export default UserNotFound;
