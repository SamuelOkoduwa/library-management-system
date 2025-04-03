import { GraphQLFieldResolver } from 'graphql';
import redisClient from '../../config/redis';

export const graphqlCache = (
  resolver: GraphQLFieldResolver<any, any>,
  cacheKey: string
) => {
  return async (parent: any, args: any, context: any, info: any) => {
    const cacheKeyWithArgs = `${cacheKey}:${JSON.stringify(args)}`;
    const cachedData = await redisClient.get(cacheKeyWithArgs);
    
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const result = await resolver(parent, args, context, info);
    await redisClient.set(cacheKeyWithArgs, JSON.stringify(result), { EX: 60 });
    return result;
  };
};