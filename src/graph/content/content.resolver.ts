import { IContext } from "../context/context.interface";
import { IContent } from "./content.interface";
import LifeStageResolver from './contentTypes/lifeStage/lifeStage.resolver';
import PromoResolver from './contentTypes/promo/promo.resolver';
import ContentBlockResolver from './contentTypes/contentBlock/contentBlock.resolver';
import camelCase from 'camelcase';

const resolverMap: any = {
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

export default [resolverMap, ...LifeStageResolver, ...PromoResolver, ...ContentBlockResolver];
