import { IContext } from "../context/context.interface";
import { authorize } from "../../config/authorization";

export const UserResolver = {
  Query: {
    user: (parent, args, context) => {
      return context;
    }
  },
  Mutation: {
    setSite: (parent, args, { authData, dataSources }: IContext) => {
      authorize(authData);
      return dataSources.usersConnector.setCongregation(authData.userInfo.HouseholdId, parseInt(args.siteId));
    },
    setLifeStage: (parent, args, { authData, dataSources }: IContext) => {
      authorize(authData);
      const response = dataSources.usersConnector.setLifeStage(authData.userInfo.ContactId, args.lifeStage);
      try {
        dataSources.analytics.client.track({
          userId: authData.userInfo.ContactId,
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
      authorize(authData);
      return authData.userInfo.UserId;
    },
    site: (user, args, { authData, dataSources }: IContext) => {
      authorize(authData);
      return dataSources.usersConnector.getCongregation(authData.userInfo.HouseholdId);
    },
    groups: (user, args, { authData, dataSources }: IContext) => {
      authorize(authData);
      return dataSources.usersConnector.getGroups(authData.userInfo.ContactId);
    },
    lifeStage: (user, args, { authData, dataSources }: IContext) => {
      authorize(authData);
      return dataSources.usersConnector.getLifeStage(authData.userInfo.ContactId);
    },
    contact: (user, args, { authData, dataSources }: IContext) => {
      authorize(authData);
      return dataSources.usersConnector.getContactDetails(authData.userInfo.ContactId);
    }
  }
};

export default UserResolver;
