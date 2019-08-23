import { ISite } from "../sites/sites.interface";
import { IGroup } from "../groups/groups.interface";
import { IContact } from "../contact/contact.interface";
import { ILifeStage } from "../content/content_types/life-stage/life-stage.interface";

export interface IUsersConnector {
    getCongregation(HouseholdID: number): Promise<ISite>
    getGroups(UserID: number): Promise<IGroup[]>
    setCongregation(HouseholdID: number, SiteID: number): Promise<ISite>
    getLifeStage(UserID: number): Promise<ILifeStage>
    setLifeStage(UserID: number, lifeStage: ILifeStage):  Promise<ILifeStage>
    getContactDetails(ContactID: number): Promise<IContact>
}

export interface IUser {
    id: number
    site: ISite
    groups: IGroup[]
    contact: IContact
}
