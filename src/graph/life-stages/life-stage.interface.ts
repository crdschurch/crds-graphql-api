export interface ILifeStageConnector {
  getLifeStages(): Promise<ILifeStage[]>
  getLifeStageContent(id: string): Promise<ILifeStageContent[]>
}

export interface ILifeStage {
  id: string
  title: string
  description?: string
  imageUrl?: string
}

export interface ILifeStageContent {
  id: string
  title: string
  contentType: string
  imageUrl: string
  slug: string
}
