export interface ILifeStageConnector {
  getLifeStages(filter?: string): Promise<ILifeStage[]>
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
