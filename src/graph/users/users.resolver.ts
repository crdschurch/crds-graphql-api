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
      return dataSources.usersConnector.setLifeStage(authData.ContactId, args.lifeStage);
    }
  },

  User: {
    id: (user, args, { authData }: IContext) => {
      return authData.UserId;
    },
    site: (user, args, { authData, dataSources }: IContext) => {
      return dataSources.usersConnector.getCongregation(authData.HouseholdId);
    },
    groups: (user, args, { authData, dataSources }: IContext) => {
      return dataSources.usersConnector.getGroups(authData.ContactId);
    },
    lifeStage: (user, args, { authData, dataSources }: IContext) => {
      return dataSources.usersConnector.getLifeStage(authData.ContactId);
    },
    contact: (user, args, {authData, dataSources }: IContext) => {
      return dataSources.usersConnector.getContactDetails(authData.ContactId);
    }
  }
};

export default UserResolver;
