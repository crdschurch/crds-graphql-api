import { injectable, inject } from "inversify";
import { ILifeStageConnector, ILifeStage, ILifeStageContent } from "./life-stage.interface";
import { ContentfulService } from "../../sources/contentful";
import { Types } from "../../ioc/types";

@injectable()
export class LifeStageConnector implements ILifeStageConnector {
  constructor(@inject(Types.ContentfulService) private contentfulService: ContentfulService){}

  public getLifeStages(): Promise<ILifeStage[]> {
    return this.contentfulService.client.getEntries({ content_type: 'life_stage' })
      .then(response => {
        return response.items.map((item: any) => {
          return {
            id: item.sys.id,
            title: item.fields.title,
            description: item.fields.description,
            imageUrl: item.fields.image.fields.file.url,
            contentTotal: item.fields.content.length
          }
        });
      })
  }

  public getLifeStageContent(id: string): Promise<ILifeStageContent[]> {
    return this.contentfulService.client.getEntry(id)
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
