import { IContext } from "../context/context.interface";
import { IContent } from "../content/content.interface";

const resolverMap: any = {
  Query: {
    lifeStages: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.lifeStageConnector.getLifeStages();
    },
    lifeStageContent: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.lifeStageConnector.getLifeStageContent(args.id);
    }
  },
  LifeStageContent: {
    qualifiedUrl: (parent: IContent, args, { authData, dataSources }: IContext) => {
      return parent.getQualifiedUrl();
    },
  }
};

export default resolverMap;
