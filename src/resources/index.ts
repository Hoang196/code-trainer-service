import config from 'config';
import connectMongo from './mongo';
import './redis';

export default async () => {
  if (config.mongodb.host) {
    await connectMongo();
  }
};
