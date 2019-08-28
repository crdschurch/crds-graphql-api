import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";
import { ILifeStage } from "./lifeStage.interface";
import { ContentFactory } from "../../content.factory";
import 'array-flat-polyfill';

const resolverMap: any = {
  Query: {
    lifeStages: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.contentConnector.getContent({ content_type: 'life_stage' });
    },
  }
};

export default resolverMap;
