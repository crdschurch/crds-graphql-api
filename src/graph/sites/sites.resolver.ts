import { IContext } from "../context/context.interface";

const resolverMap: any = {
  Query: {
   sites: (parent, args, { authData, dataSources }: IContext) => {
    return dataSources.sitesConnector.getSites(args.filter);
    }
  }
}

export default resolverMap;
