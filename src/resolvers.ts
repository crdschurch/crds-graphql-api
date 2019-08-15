import userResolvers from './graph/users/users.resolver';
import siteResolvers from './graph/sites/sites.resolver';
import lifeStageResolver from './graph/life-stages/life-stage.resolver';

const resolvers: any = [userResolvers, siteResolvers, lifeStageResolver];

export default resolvers;
