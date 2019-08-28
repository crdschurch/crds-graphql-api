import Series from "./contentTypes/series/series";

export interface IContent {
    title: string
    contentType: string
    category: string
    tags: string[]
    description: string
    slug: string
    interaction_count: number
    id: string
    imageUrl: string
    getQualifiedUrl(): Promise<string>
}

export interface IContentConnector {
    getSeriesDataForMessages(item): Promise<Series>
    getContent(filters): Promise<IContent[]>
}

export interface IContentService {
    getContent(filters: any): Promise<any>
}
