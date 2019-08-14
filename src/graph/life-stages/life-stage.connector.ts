import { injectable } from "inversify";
import { ISitesConnector } from "../sites/sites.interface";
import { ILifeStageConnector, ILifeStage } from "./life-stage.interface";
import { createClient } from "contentful";


@injectable()
export class LifeStageConnector implements ILifeStageConnector {

  public contentfulConfig = {
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    space: process.env.CONTENTFUL_SPACE_ID,
    environment: process.env.CONTENTFUL_ENV
  }

  public getLifeStages(filter?: string): Promise<ILifeStage[]> {
    const client = createClient(this.contentfulConfig);

    return client.getContentType('life_stage')
      .then(response => {
        return response.fields.map(fields => {
          return {
              title: 'title',
              description: 'description',
              imageUrl: 'imageUrl'
          }
        })
      })
  }
}
