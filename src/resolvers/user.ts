import { testData, mp } from "./../connectors";
import { IResolvers } from "graphql-tools";
import { Resolver } from "dns";

const resolverMap: any = {
  Query: {
    user: (parent, args, context) => {
      //context.userid is really however that is passed in on the headers
      return context;
    }
  },

  Mutation: {
    setSite: (parent, args, context) => {
      return mp.setCongregation(context.HouseholdId, args.siteId);
    }
  },

  User: {
    site: (user, args, context) => {
      return mp.getCongregation(context.HouseholdId);
    },
    groups: (user, args, context) => {
      return mp.getGroups(context.ParticipantId)
    }
  }
};

export default resolverMap;
