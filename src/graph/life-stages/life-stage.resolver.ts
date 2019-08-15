import { ILifeStageConnector } from "./life-stage.interface";
import { Types } from "../../ioc/types";
import container from "../../ioc/inversify.config";
import { IContext } from "../context/context.interface";
import { isContext } from "vm";

const resolverMap: any = {
  Query: {
    lifeStages: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.lifeStageConnector.getLifeStages();
    },
    lifeStageContent: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.lifeStageConnector.getLifeStageContent(args.filter);
    }
  }
}

export default resolverMap;
