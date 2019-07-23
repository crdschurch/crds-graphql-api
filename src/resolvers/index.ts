import userResolvers from './user';
import siteResolvers from './site';
import { IResolvers } from 'graphql-tools';

const resolvers: any = [userResolvers, siteResolvers];

export default resolvers;
