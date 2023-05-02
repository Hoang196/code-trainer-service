export interface CustomError {
  CODE: string;
  MESSAGE: string;
}

export const ERROR_CODES = {
  DUPLICATED: 11000,
};

export const ErrorCodes: { [key: string]: CustomError } = {
  UNAUTHORIZED: {
    CODE: 'UNAUTHORIZED',
    MESSAGE: 'User is not allowed to perform this operation',
  },
  VALIDATION_ERROR: {
    CODE: 'VALIDATION_ERROR',
    MESSAGE: 'Validation failed error',
  },
  USER_WITH_ID_NOT_FOUND: {
    CODE: 'USER_WITH_ID_NOT_FOUND',
    MESSAGE: 'User with given id not found',
  },
  SERVICE_ERROR: {
    CODE: 'SERVICE_ERROR',
    MESSAGE: 'Obtained error from external service. Please check the logs.',
  },
  TOKEN_EXPIRED: {
    CODE: 'TOKEN_EXPIRED',
    MESSAGE: 'Unauthenticated request, access token expired',
  },
  NOT_FOUND: {
    CODE: 'NOT_FOUND',
    MESSAGE: 'Not found',
  },
  BAD_REQUEST: {
    CODE: 'BAD_REQUEST',
    MESSAGE: 'Bad request',
  },
  INTERNAL_SERVICE_ERROR: {
    CODE: 'INTERNAL_SERVICE_ERROR',
    MESSAGE: `Obtained error from internal service.`,
  },
  USER_NOT_FOUND: {
    CODE: 'USER_NOT_FOUND',
    MESSAGE: 'User data does not exist',
  },
  USER_EXISTED: {
    CODE: 'OBJECT_EXISTED',
    MESSAGE: 'Object existed in system',
  },
  FORBIDDEN: {
    CODE: 'FORBIDDEN',
    MESSAGE: 'User does not have access rights to this content',
  },
};
