import { injectable, inject } from "inversify";
import { ContentfulService } from "../../sources/contentful";
import { Types } from "../../ioc/types";
import { IContent, IContentReferences, IContentConnector } from "../content/content.interface";
import Series from "../content/content_types/series";
import { ContentFactory } from "../content/content.factory";

@injectable()
export class ContentConnector implements IContentConnector {

  constructor(@inject(Types.ContentfulService) private contentfulService: ContentfulService) { }

  public getReferencedContent(content: IContent): Promise<IContentReferences> {
    return content.getReferences();
  }

  public getSeriesDataForMessages(item): Promise<Series> {
    if (item.contentType !== 'message') return item;
    return this.getContent({
      'content_type': 'series',
      'fields.videos.sys.id': item.id
    }).then((entries) => {
      if(entries.length === 0) return null;
      return new Series(entries[0]);
    });
  }

  private getNextEntries(filters, entries, skip) {
    var params = {
      skip: skip,
      limit: 1000,
      include: 2
    };

    Object.assign(params, filters);

    return this.contentfulService.client.getEntries(params)
      .then((response) => {
        entries = [...entries, ...response.items];
        if (response.items.length !== 1000) return entries;
        return this.getNextEntries(filters, entries, skip + 1000);
      }).catch((ex) => { throw ex; })
  }

  private getContent(filters) {
    return this.getNextEntries(filters, [], 0);
  }
}
