import userResolvers from './graph/users/users.resolver';
import siteResolvers from './graph/sites/sites.resolver';
import contentResolver from './graph/content/content.resolver';
import groupsResolver from './graph/groups/groups.resolver';

const resolvers: any = [userResolvers, siteResolvers, ...contentResolver, groupsResolver];

export default resolvers;
