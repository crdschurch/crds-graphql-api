import { IContent } from "../../content.interface";
import Series from "../series/series";

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
