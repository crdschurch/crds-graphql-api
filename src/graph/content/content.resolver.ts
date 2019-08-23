import { IContext } from "../context/context.interface";
import { IContent } from "./content.interface";
import LifeStageResolver from './content_types/life-stage/life-stage.resolver';
import camelCase from 'camelcase';

const resolverMap: any = {
    Query: {
        promos: (parent, args, { authData, dataSources }: IContext) => {
            return dataSources.contentConnector.getContent({ 'content_type': 'promo' });
        }
    },
    Media: {
        __resolveType(content: IContent, context, info) {
            return camelCase(content.contentType, {pascalCase: true});
        },
        qualifiedUrl: (parent: IContent, args, { authData, dataSources }: IContext) => {
            return parent.getQualifiedUrl();
        }
    },
    Content: {
        __resolveType(content: IContent, context, info) {
            return camelCase(content.contentType, {pascalCase: true});
        },
    },
};

export default [resolverMap, LifeStageResolver];
