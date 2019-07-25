import { ISitesConnector } from "./sites.interface";
import { Types } from "../../ioc/types";
import container from "../../ioc/inversify.config";

const resolverMap: any = {
  Query: {
   sites: (parent, args, context) => {
    const sitesConnector: ISitesConnector = container.get<ISitesConnector>(Types.SitesConnector);
    return sitesConnector.getSites();
    }
  }
}

export default resolverMap;
