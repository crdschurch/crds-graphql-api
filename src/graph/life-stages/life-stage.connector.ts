import { injectable } from "inversify";
import { ILifeStageConnector, ILifeStage, ILifeStageContent } from "./life-stage.interface";
import { createClient } from "contentful";

@injectable()
export class LifeStageConnector implements ILifeStageConnector {

  private client = createClient({
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    space: process.env.CONTENTFUL_SPACE_ID,
    environment: process.env.CONTENTFUL_ENV
  });

  public getLifeStages(): Promise<ILifeStage[]> {
    return this.client.getEntries({ content_type: 'life_stage' })
      .then(response => {
        return response.items.map((item: any) => {
          return {
            id: item.sys.id,
            title: item.fields.title,
            description: item.fields.description,
            imageUrl: item.fields.image.fields.file.url
          }
        });
      })
  }

  public getLifeStageContent(id: string): Promise<ILifeStageContent[]> {
    return this.client.getEntry(id)
      .then((response: any) => {
        return response.fields.content.map((item: any) => {
          return {
            id: item.sys.id,
            title: item.fields.title,
            slug: item.fields.slug,
            imageUrl: item.fields.image.fields.file.url,
            contentType: item.sys.contentType.sys.id
          }
        })
      })
  }
}
