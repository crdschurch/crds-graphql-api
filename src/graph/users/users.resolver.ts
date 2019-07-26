import { IUsersConnector } from "./users.interface";
import { Types } from "../../ioc/types";
import container from "../../ioc/inversify.config";

export const UserResolver = {
  Query: {
    user: (parent, args, context) => {
      //context.userid is really however that is passed in on the headers
      return context;
    }
  },

  Mutation: {
    setSite: (parent, args, context) => {
      const usersConnector: IUsersConnector = container.get<IUsersConnector>(Types.UsersConnector);
      return usersConnector.setCongregation(context.HouseholdId, parseInt(args.siteId));
    }
  },

  User: {
    site: (user, args, context) => {
      const usersConnector: IUsersConnector = container.get<IUsersConnector>(Types.UsersConnector);
      return usersConnector.getCongregation(context.HouseholdId);
    },
    groups: (user, args, context) => {
      const usersConnector: IUsersConnector = container.get<IUsersConnector>(Types.UsersConnector);
      return usersConnector.getGroups(context.ParticipantId)
    }
  }
};

export default UserResolver;
