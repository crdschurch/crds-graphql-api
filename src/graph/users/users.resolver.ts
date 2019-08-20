import { IContext } from "../context/context.interface";

export const UserResolver = {
  Query: {
    user: (parent, args, context) => {
      return context;
    }
  },
  Mutation: {
    setSite: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.usersConnector.setCongregation(authData.HouseholdId, parseInt(args.siteId));
    },
    setLifeStage: (parent, args, { authData, dataSources }: IContext) => {
      const response = dataSources.usersConnector.setLifeStage(authData.ContactId, args.lifeStage);
      try {
        dataSources.analytics.client.track({
          userId: authData.ContactId,
          event: 'user changed life-stage',
          properties: args
        });
      } catch (err) {
        dataSources.logger.logError(err);
      }
      return response;
    }
  },
  User: {
    site: (user, args, { authData, dataSources }: IContext) => {
      return dataSources.usersConnector.getCongregation(authData.HouseholdId);
    },
    groups: (user, args, { authData, dataSources }: IContext) => {
      return dataSources.usersConnector.getGroups(authData.ContactId);
    },
    lifeStage: (user, args, { authData, dataSources }: IContext) => {
      return dataSources.usersConnector.getLifeStage(authData.ContactId);
    }
  }
};

export default UserResolver;
