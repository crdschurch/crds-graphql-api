import { IContext } from "../context/context.interface";

const resolverMap: any = {
    Author: {
        references: (parent, args, { authData, dataSources }: IContext) => {
            return dataSources.contentConnector.getReferencedContent(parent);
        }
    }
};

export default resolverMap;
