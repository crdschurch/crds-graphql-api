import { IContext } from "../context/context.interface";

export const UserResolver = {
  Query: {
    user: (parent, args, context) => {
      return context;
    }
  },
  Mutation: {
    setSite: (parent, args, { authData, dataSources }: IContext) => {
      if(!authData) throw new Error("You are not authorized.");
      return dataSources.usersConnector.setCongregation(authData.HouseholdId, parseInt(args.siteId));
    },
    setLifeStage: (parent, args, { authData, dataSources }: IContext) => {
      if(!authData) throw new Error("You are not authorized.");
      const response = dataSources.usersConnector.setLifeStage(authData.ContactId, args.lifeStage);
      try {
        dataSources.analytics.client.track({
          userId: authData.ContactId,
          event: 'LifeStageUpdated',
          properties: args
        });
      } catch (err) {
        dataSources.logger.logError(err);
      }
      return response;
    }
  },
  User: {
    id: (user, args, { authData }: IContext) => {
      return authData.UserId;
    },
    site: (user, args, { authData, dataSources }: IContext) => {
      if(!authData) throw new Error("You are not authorized.");
      return dataSources.usersConnector.getCongregation(authData.HouseholdId);
    },
    groups: (user, args, { authData, dataSources }: IContext) => {
      if(!authData) throw new Error("You are not authorized.");
      return dataSources.usersConnector.getGroups(authData.ContactId);
    },
    lifeStage: (user, args, { authData, dataSources }: IContext) => {
      if(!authData) throw new Error("You are not authorized.");
      return dataSources.usersConnector.getLifeStage(authData.ContactId);
    },
    contact: (user, args, {authData, dataSources }: IContext) => {
      if(!authData) throw new Error("You are not authorized.");
      return dataSources.usersConnector.getContactDetails(authData.ContactId);
    }
  }
};

export default UserResolver;
