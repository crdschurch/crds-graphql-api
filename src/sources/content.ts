import { createClient, ContentfulClientApi } from 'contentful';
import { injectable } from 'inversify';
import { IContentService } from '../graph/content/content.interface';

@injectable()
export class ContentService implements IContentService {
  private client: ContentfulClientApi;

  constructor() {
    this.client = createClient({
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      space: process.env.CONTENTFUL_SPACE_ID,
      environment: process.env.CONTENTFUL_ENV
    });
  }

  private getNextEntries(filters: object, entries, skip): Promise<any> {
    var params = {
      skip: skip,
      limit: 1000,
      include: 2
    };

    Object.assign(params, filters);

    return this.client.getEntries(params)
      .then((response) => {
        entries = [...entries, ...response.items];
        if (response.items.length !== 1000) return entries;
        return this.getNextEntries(filters, entries, skip + 1000);
      }).catch((ex) => { throw ex; })
  }

  public getContent(filters: object): Promise<any> {
    return this.getNextEntries(filters, [], 0);
  }

}
