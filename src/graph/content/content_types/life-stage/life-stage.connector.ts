import { injectable, inject } from "inversify";
import { ILifeStageConnector, ILifeStage } from "./life-stage.interface";
import { Types } from "../../../../ioc/types";
import { IContent, IContentConnector, IContentService } from "../../content.interface";
import { ContentFactory } from "../../content.factory";

@injectable()
export class LifeStageConnector implements ILifeStageConnector {

  constructor(
    @inject(Types.ContentService) private contentService: IContentService
    ) { }

  public getLifeStageContent(id: string): Promise<IContent[]> {
    return this.contentService.getContent({ 'sys.id': id })
      .then((items: any) => {
        let content = items[0].fields.content;
        return content.map((item: any) => ContentFactory.instantiate(item))
      })
  }
}
