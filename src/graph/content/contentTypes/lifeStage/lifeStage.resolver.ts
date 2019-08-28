import { IContext } from "../../../context/context.interface";

const resolverMap: any = {
  Query: {
    lifeStages: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.contentConnector.getContent({ content_type: 'life_stage' });
    },
  }
};

export default resolverMap;
