import { ISite } from "../sites/sites.interface";
import { IGroup } from "../groups/groups.interface";

export interface IUsersConnector {
    getCongregation(HouseholdID: number): Promise<ISite>
    getGroups(ParticipantID: number): Promise<IGroup[]>
    setCongregation(HouseholdID: number, SiteID: number): Promise<ISite>
}

export interface IUser {
    id: number
    site: ISite
    groups: IGroup[]
}
