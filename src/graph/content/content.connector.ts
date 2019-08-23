import { injectable, inject } from "inversify";
import { Types } from "../../ioc/types";
import { IContentConnector, IContentService, IContent } from "../content/content.interface";
import Series from "./content_types/series/series";
import { findFieldsThatChangedTypeOnObjectOrInterfaceTypes } from "graphql/utilities/findBreakingChanges";
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

    public getSeriesDataForMessages(item): Promise<Series> {
        if (item.contentType !== 'message') return item;
        return this.contentService.getContent({
            'content_type': 'series',
            'fields.videos.sys.id': item.id
        }).then((entries) => {
            if (entries.length === 0) return null;
            return new Series(entries[0]);
        });
    }
}
