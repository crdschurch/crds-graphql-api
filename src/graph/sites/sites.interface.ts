export interface ISitesConnector {
    getSites(): Promise<ISite[]>
}

export interface ISite {
    id: number
    name: string
}
