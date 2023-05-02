import HttpException from './HttpException';
import { ErrorCodes } from './errorCode';

class ForbiddenException extends HttpException {
  constructor() {
    const errorDetail = ErrorCodes.FORBIDDEN;
    super(403, errorDetail.MESSAGE, errorDetail.CODE);
  }
}

export default ForbiddenException;
