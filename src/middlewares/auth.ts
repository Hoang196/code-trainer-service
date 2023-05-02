import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import RequestWithUser from 'utils/rest/request';
import logger from 'logger';
import { UserNotAuthorizedException, ApiKeyNotAuthorizedException, TokenExpiredException } from 'exceptions';
import config from 'config';

const authMiddleware = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  if (request.headers && request.headers.authorization) {
    const tokenArray = request.headers.authorization.split(' ');
    const idToken = tokenArray[1];
    if (idToken) {
      jwt.verify(idToken, config.jwtAccessSecretKey, (err, data) => {
        if (err) {
          next(new TokenExpiredException());
        }
      });
      next();
    } else {
      next(new UserNotAuthorizedException());
    }
  } else {
    logger.warn(`Admin token not present`);
    next(new UserNotAuthorizedException());
  }
};

const apiKeyAuthMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (!req.headers || !req.headers['x-api-key']) {
    logger.warn('Request without API Key');
    next(new ApiKeyNotAuthorizedException());
  }
  const apiKey = req.headers['x-api-key'];

  if (apiKey !== config.internalApiKey) {
    logger.warn(`Api Key is invalid: ${apiKey}`);
    next(new ApiKeyNotAuthorizedException());
  }

  logger.info(`Api Key is valid :${apiKey}`);
  next();
};

export { authMiddleware, apiKeyAuthMiddleware };
