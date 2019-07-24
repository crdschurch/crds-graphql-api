import { testData, mp } from "./../connectors";
import { IResolvers } from "graphql-tools";
import { Resolver } from "dns";

const resolverMap: any = {
  Query: {
   sites: (parent, args, context) => {
      return mp.getSites();
    }
  }
}

export default resolverMap;
