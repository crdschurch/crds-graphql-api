import { injectable, inject } from "inversify";
import { ILifeStageConnector, ILifeStage } from "./life-stage.interface";
import { Types } from "../../ioc/types";
import { IContent, IContentConnector, IContentService } from "../content/content.interface";
import { ContentFactory } from "../content/content.factory";

@injectable()
export class LifeStageConnector implements ILifeStageConnector {

  constructor(
    @inject(Types.ContentService) private contentService: IContentService
    ) { }

  public getLifeStages(): Promise<ILifeStage[]> {
    return this.contentService.getContent({ content_type: 'life_stage' })
      .then(items => {
        return items.map((item: any) => {
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

  public getLifeStageContent(id: string): Promise<IContent[]> {
    return this.contentService.getContent({ 'sys.id': id })
      .then((items: any) => {
        let content = items[0].fields.content;
        return content.map((item: any) => ContentFactory.instantiate(item))
      })
  }
}
