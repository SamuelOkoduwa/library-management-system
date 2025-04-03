import { Request, Response, NextFunction } from 'express';
import redisClient from '../config/redis';

export const cache = (key: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
    next();
  };
};