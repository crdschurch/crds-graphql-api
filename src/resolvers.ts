import userResolvers from './graph/users/users.resolver';
import siteResolvers from './graph/sites/sites.resolver';
import contentResolver from './graph/content/content.resolver';

const resolvers: any = [userResolvers, siteResolvers, ...contentResolver];

export default resolvers;
