import { IContext } from "../context/context.interface";

const resolverMap: any = {
  Content: {
    references: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.lifeStageConnector.getReferencedContent(parent);
    }
  }
};

export default resolverMap;
