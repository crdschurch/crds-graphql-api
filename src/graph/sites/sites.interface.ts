export interface ISitesAPI {
    getSites(availableOnline?: boolean): Promise<ISite[]>
}

export interface ISite {
    id: number
    name: string
}
