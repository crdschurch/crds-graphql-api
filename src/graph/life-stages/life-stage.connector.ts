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

  public getLifeStages(filter?: string) {
    const client = createClient(this.contentfulConfig);

    client.getContentType('life_stage')
      .then(data => {
        return data;
      })
    
    return {
      title: "yo",
      description: "super yo",
      imageUrl: "I'm a url"
    };
  }
}
