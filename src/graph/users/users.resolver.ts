import { IUsersConnector } from "./users.interface";
import { Types } from "../../ioc/types";
import container from "../../ioc/inversify.config";
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
      return dataSources.usersConnector.setLifeStage(authData.ContactId, args.lifeStage, dataSources.mongo);
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
      return dataSources.usersConnector.getLifeStage(authData.ContactId, dataSources.mongo);
    }
  }
};

export default UserResolver;
