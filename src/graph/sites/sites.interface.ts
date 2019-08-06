export interface ISitesConnector {
    getSites(filters?: string): Promise<ISite[]>
}

export interface ISite {
    id: number
    name: string
}
