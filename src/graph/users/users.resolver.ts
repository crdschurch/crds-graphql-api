import { IContext } from "../context/context.interface";
import { authorize } from "../../config/authorization";
import { ValidationError } from "apollo-server-express";

export const UserResolver = {
  Query: {
    user: async (parent, args, { authData, dataSources }: IContext, info) => {
      authorize(authData);
      return authData.userInfo;
    }
  },
  Mutation: {
    setSite: (parent, args, { authData, dataSources }: IContext) => {
      authorize(authData);
      if (Number.isNaN(parseInt(args.siteId)))
        throw new ValidationError(`SiteId: ${args.siteId} is not a number`);
      return dataSources.usersAPI.setCongregation(
        authData.userInfo.HouseholdId,
        parseInt(args.siteId)
      );
    },
    setLifeStage: (parent, args, { authData, dataSources }: IContext) => {
      authorize(authData);
      const response = dataSources.usersMongo.setLifeStage(
        authData.userInfo.ContactId,
        args.lifeStage
      );
      try {
        dataSources.analytics.client.track({
          userId: authData.userInfo.ContactId,
          event: "LifeStageUpdated",
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
    firstName: async (user, args, { authData, dataSources }: IContext) => { 
      authorize(authData);
      const contact = await dataSources.usersAPI.getContactDetails(user.ContactId);
      return contact.firstName;
    },
    nickName: async (user, args, { authData, dataSources }: IContext) => { 
      authorize(authData);
      const contact = await dataSources.usersAPI.getContactDetails(user.ContactId);
      return contact.nickName;
    },
    lastName: async (user, args, { authData, dataSources }: IContext) => { 
      authorize(authData);
      const contact = await dataSources.usersAPI.getContactDetails(user.ContactId);
      return contact.lastName;
    },
    gender: async (user, args, { authData, dataSources }: IContext) => { 
      authorize(authData);
      const contact = await dataSources.usersAPI.getContactDetails(user.ContactId);
      return contact.gender;
    },
    maritalStatus: async (user, args, { authData, dataSources }: IContext) => { 
      authorize(authData);
      const contact = await dataSources.usersAPI.getContactDetails(user.ContactId);
      return contact.maritalStatus;
    },
    email: async (user, args, { authData, dataSources }: IContext) => { 
      authorize(authData);
      const contact = await dataSources.usersAPI.getContactDetails(user.ContactId);
      return contact.email;
    },
    site: (user, args, { authData, dataSources }: IContext) => {
      authorize(authData);
      return dataSources.usersAPI.getCongregation(
        authData.userInfo.HouseholdId
      );
    },
    groups: (user, args, { authData, dataSources }: IContext) => {
      authorize(authData);
      return dataSources.usersAPI.getGroups(
        authData.userInfo.ParticipantId, args.types, args.expired
      );
    },
    lifeStage: (user, args, { authData, dataSources }: IContext) => {
      authorize(authData);
      return dataSources.usersMongo.getLifeStage(
        authData.userInfo.ContactId
      );
    }
  }
};

export default UserResolver;
