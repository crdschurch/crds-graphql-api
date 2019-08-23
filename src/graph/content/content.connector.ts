import { injectable, inject } from "inversify";
import { Types } from "../../ioc/types";
import { IContentConnector, IContentService } from "../content/content.interface";
import Series from "../content/content_types/series";

@injectable()
export class ContentConnector implements IContentConnector {

    constructor(@inject(Types.ContentService) private contentService: IContentService) { }

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
