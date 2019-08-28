import { IContext } from "../../../context/context.interface";

const resolverMap: any = {
    Query: {
        contentBlocks: (parent, args, { authData, dataSources }: IContext) => {
            return dataSources.contentConnector.getContent({ 'content_type': 'content_block', ...args.filters });
        }
    },
};

export default resolverMap;
