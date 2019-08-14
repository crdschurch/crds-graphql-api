import { IContext } from "../context/context.interface";
import { ILifeStageConnector } from "./life-stage.interface";

const resolverMap: any = {
  Query: {
    lifeStages: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.lifeStageConnector.getLifeStages(args.filter);
    }
  }
}

export default resolverMap;
