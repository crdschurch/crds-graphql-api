import { injectable, inject } from "inversify";
import { ILifeStageConnector, ILifeStage, ILifeStageContent } from "./life-stage.interface";
import { ContentfulService } from "../../sources/contentful";
import { Types } from "../../ioc/types";

@injectable()
export class LifeStageConnector implements ILifeStageConnector {
  constructor(@inject(Types.ContentfulService) private contentfulService: ContentfulService) { }

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
    return this.contentfulService.client.getEntries({'sys.id': id, include: 2})
      .then((response: any) => {
        return response.items[0].fields.content.map((item: any) => {
          return {
            id: item.sys.id,
            title: item.fields.title,
            slug: item.fields.slug,
            imageUrl: item.fields.image.fields.file.url,
            contentType: item.sys.contentType.sys.id,
            duration: item.fields.duration,
            author: (item.fields.author && ((item.fields.author.fields && [item.fields.author.fields.full_name]) || item.fields.author.map(a => a.fields.full_name))) || [],
            category: (item.fields.category && item.fields.category.fields.title)
          }
        })
      })
  }
}
