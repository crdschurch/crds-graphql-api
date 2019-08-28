import { IContent } from "../../content.interface";
import Series from "../series/series";

export interface ILifeStage {
  id: string
  title: string
  description: string
  imageUrl: string
  contentTotal: string
  content: IContent[]
}
