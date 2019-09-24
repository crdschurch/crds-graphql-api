import { Types } from "../../ioc/types";
import container from "../../ioc/inversify.config";
import { IContext } from "../context/context.interface";

const resolverMap: any = {
  Query: {
   sites: (parent, args, { authData, dataSources }: IContext) => {
    return dataSources.sitesAPI.getSites(args.availableOnline);
    }
  }
}

export default resolverMap;
