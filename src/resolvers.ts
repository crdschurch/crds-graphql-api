import userResolvers from './graph/users/users.resolver';
import siteResolvers from './graph/sites/sites.resolver';

const resolvers: any = [userResolvers, siteResolvers];

export default resolvers;
