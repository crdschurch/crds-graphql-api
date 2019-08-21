import { IContext } from "../context/context.interface";
import Author from "./content_types/author";

const resolverMap: any = {
    Author: {
        qualifiedUrl: (parent: Author, args, { authData, dataSources }: IContext) => {
            return parent.getQualifiedUrl();
        }
    }
};

export default resolverMap;
