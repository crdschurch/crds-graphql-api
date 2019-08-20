import { ISite } from "../sites/sites.interface";
import { IGroup } from "../groups/groups.interface";
import { ILifeStage } from "../life-stages/life-stage.interface";
import { Mongo } from "../../sources/mongo";
import { DataSource } from "apollo-datasource";

export interface IUsersConnector {
    getCongregation(HouseholdID: number): Promise<ISite>
    getGroups(UserID: number): Promise<IGroup[]>
    setCongregation(HouseholdID: number, SiteID: number): Promise<ISite>
    getLifeStage(UserID: number): Promise<ILifeStage>
    setLifeStage(UserID: number, lifeStage: ILifeStage):  Promise<ILifeStage>
}

export interface IUser {
    id: number
    site: ISite
    groups: IGroup[]
}
