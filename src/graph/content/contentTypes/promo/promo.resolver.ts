import { IContext } from "../../../context/context.interface";

const resolverMap: any = {
    Query: {
        promos: (parent, args, { authData, dataSources }: IContext) => {
            return dataSources.contentConnector.getContent({ 'content_type': 'promo' });
        }
    },
};

export default [resolverMap];
