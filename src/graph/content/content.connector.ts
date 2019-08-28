import { injectable, inject } from "inversify";
import { Types } from "../../ioc/types";
import { IContentConnector, IContentService, IContent } from "../content/content.interface";
import Series from "./contentTypes/series/series";
import { ContentFactory } from "./content.factory";

@injectable()
export class ContentConnector implements IContentConnector {

    constructor(@inject(Types.ContentService) private contentService: IContentService) { }

    public getContent(filters): Promise<IContent[]> {
        return this.contentService.getContent(filters)
            .then((entries) => {
                return entries.map(entry => ContentFactory.instantiate(entry));
            });
    }
}
