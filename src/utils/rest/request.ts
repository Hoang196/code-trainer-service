import { Request } from 'express';
import URLParams from './urlparams';

/**
 * Interface to add extra modifiers to request.
 */
export default interface RequestWithUser extends Request {
  // To use userId and role, please inject the same in a middleware, by decoding an access token.
  startTime?: number;
  searchParams?: URLParams; // TODO: perhaps change to Dto and add validation,
}
