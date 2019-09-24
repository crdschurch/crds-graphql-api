import { ISite } from "../sites/sites.interface";
import { IGroup } from "../groups/groups.interface";
import { ILifeStage } from "../content/contentTypes/lifeStage/lifeStage.interface";

export interface IUsersAPI {
    getCongregation(HouseholdID: number): Promise<ISite>
    getGroups(UserID: number, types?: string[], expired?: boolean): Promise<IGroup[]>
    setCongregation(HouseholdID: number, SiteID: number): Promise<ISite>
    getContactDetails(ContactID: number): Promise<IContact>
}

export interface IUsersMongo {
    getLifeStage(UserID: number): Promise<ILifeStage>
    setLifeStage(UserID: number, lifeStage: ILifeStage):  Promise<ILifeStage>
}

export interface IUser {
    id: number
    site?: ISite
    groups?: IGroup[]
    nickName?: string
    firstName?: string
    lastName?: string
    gender?: string
    maritalStatus?: string
}

export interface IContact {
    nickName: string
    firstName: string
    lastName: string
    gender: string
    maritalStatus: string
  }
  
