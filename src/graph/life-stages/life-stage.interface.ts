import { IContent, IContentReferences } from "../content/content.interface";
import Series from "../content/content_types/series";

export interface ILifeStageConnector {
  getLifeStages(): Promise<ILifeStage[]>
  getLifeStageContent(id: string): Promise<IContent[]>
  getReferencedContent(content: IContent): Promise<IContentReferences>
  getSeriesDataForMessages(content: IContent): Promise<Series> 
}

export interface ILifeStage {
  id: string
  title: string
  description: string
  imageUrl: string
  contentTotal: string
}
