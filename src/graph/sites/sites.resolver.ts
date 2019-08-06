import { ISitesConnector } from "./sites.interface";
import { Types } from "../../ioc/types";
import container from "../../ioc/inversify.config";
import { IContext } from "../context/context.interface";

const resolverMap: any = {
  Query: {
   sites: (parent, args, { authData, dataSources }: IContext) => {
    return dataSources.sitesConnector.getSites(args.filter);
    }
  }
}

export default resolverMap;
