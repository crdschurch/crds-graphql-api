import { IContent } from "../../content.interface";

export interface ILifeStageConnector {
  getLifeStageContent(id: string): Promise<IContent[]>
}

export interface ILifeStage {
  id: string
  title: string
  description: string
  imageUrl: string
  contentTotal: string
}
