import { IContext } from "../context/context.interface";

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
