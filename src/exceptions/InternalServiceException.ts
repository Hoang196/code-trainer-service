import HttpException from './HttpException';
import { ErrorCodes } from './errorCode';

class InternalServiceException extends HttpException {
  constructor() {
    const errorDetail = ErrorCodes.INTERNAL_SERVICE_ERROR;
    super(500, errorDetail.MESSAGE, errorDetail.CODE);
  }
}

export default InternalServiceException;
