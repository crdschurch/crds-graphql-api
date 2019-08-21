import { injectable, inject } from "inversify";
import { ILifeStageConnector, ILifeStage } from "./life-stage.interface";
import { ContentfulService } from "../../sources/contentful";
import { Types } from "../../ioc/types";
import { IContent, IContentConnector } from "../content/content.interface";
import { ContentFactory } from "../content/content.factory";

@injectable()
export class LifeStageConnector implements ILifeStageConnector {

  constructor(
    @inject(Types.ContentConnector) private contentConnector: IContentConnector
    ) { }

  public getLifeStages(): Promise<ILifeStage[]> {
    return this.contentConnector.getContent({ content_type: 'life_stage' })
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
    return this.contentConnector.getContent({ 'sys.id': id, include: 2 })
      .then((items: any) => {
        let content = items[0].fields.content;
        return content.map((item: any) => ContentFactory.instantiate(item))
      })
  }
}
