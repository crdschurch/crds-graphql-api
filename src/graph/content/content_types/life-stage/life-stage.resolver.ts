import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";

const resolverMap: any = {
  Query: {
    lifeStages: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.contentConnector.getContent({content_type: 'life_stage'});
    },
    lifeStageContent: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.lifeStageConnector.getLifeStageContent(args.id);
    }
  },
};

export default resolverMap;
