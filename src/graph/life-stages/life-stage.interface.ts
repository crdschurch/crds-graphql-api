export interface ILifeStageConnector {
  getLifeStages(): Promise<ILifeStage[]>
  // getLifeStageContent(filter?: string): Promise<ILifeStageContent[]>
}

export interface ILifeStage {
  title: string
  description: string
  imageUrl: string
}

export interface ILifeStageContent {
  title: string
  description: string
  imageUrl: string
  slug: string
}
