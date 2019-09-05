import { IContext } from "../context/context.interface";
import { authorize } from "../../config/authorization";
import { ValidationError } from 'apollo-server-express'

export const UserResolver = {
  Query: {
    user: (parent, args, { authData, dataSources }: IContext, info) => {
      info.cacheControl.setCacheHint({ scope: 'PRIVATE' });
      authorize(authData);
      return authData.userInfo;
    }
  },
  Mutation: {
    setSite: (parent, args, { authData, dataSources }: IContext) => {
      authorize(authData);
      if(Number.isNaN(parseInt(args.siteId))) throw new ValidationError(`SiteId: ${args.siteId} is not a number`)
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
      return dataSources.usersConnector.getGroups(authData.userInfo.ParticipantId);
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
