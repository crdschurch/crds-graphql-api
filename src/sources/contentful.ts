import { createClient, ContentfulClientApi } from 'contentful';
import { injectable } from 'inversify';

@injectable()
export class ContentfulService {
  public client: ContentfulClientApi;

  constructor() {
    this.client = createClient({
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      space: process.env.CONTENTFUL_SPACE_ID,
      environment: process.env.CONTENTFUL_ENV
    });
  }
}
