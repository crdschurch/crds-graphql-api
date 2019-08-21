import Series from "./content_types/series";

export interface IContent {
    title: string
    contentType: string
    category: string
    tags: string[]
    description: string
    slug: string
    interaction_count: number
    id: string
    getQualifiedUrl(): Promise<string>
}

export interface IContentConnector {
    getSeriesDataForMessages(item): Promise<Series>
}
