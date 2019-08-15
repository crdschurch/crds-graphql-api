import { injectable } from "inversify";
import { ISite } from "../sites/sites.interface";
import { IGroup } from "../groups/groups.interface";
import { IUsersConnector, IUser } from "./users.interface";
import { Mongo } from '../../sources/mongo';
import { ILifeStage } from "../life-stages/life-stage.interface";

const MP = require("ministry-platform");

@injectable()
export class UsersConnector implements IUsersConnector {
    public getCongregation(HouseholdID: number): Promise<ISite> {
        const filter = `Households.[Household_ID] = ${HouseholdID}`;
        const table = "Households";
        const mp = new MP();
        return mp
            .withSelectColumns([
                "Congregation_ID_Table.[Congregation_ID]",
                "Congregation_ID_Table.[Congregation_Name]"
            ])
            .withFilter(filter)
            .fromTable(table)
            .get()
            .then(response => {
                return {
                    id: response.data[0].Congregation_ID,
                    name: response.data[0].Congregation_Name
                };
            });
    }

    public getGroups(UserID: number): Promise<IGroup[]> {
        const filter = `Group_Participants.[Participant_ID] = ${UserID}`;
        const table = "Group_Participants";
        const mp = new MP();
        return mp
            .withSelectColumns([
                "Group_Participants.[Group_Role_ID]",
                "Group_ID_Table.[Group_ID]",
                "Group_ID_Table.[Group_Name]",
                "Group_ID_Table.[Group_Type_ID]"
            ])
            .withFilter(filter)
            .fromTable(table)
            .get()
            .then(response => {
                return response.data.map(group => {
                    return {
                        id: group.Group_ID,
                        name: group.Group_Name,
                        role: group.Group_Role_ID,
                        type: group.Group_Type_ID
                    };
                });
            });
    }

    public setCongregation(HouseholdID: number, SiteID: number): Promise<ISite> {
        const mp = new MP();
        return mp
            .fromTable('households')
            .put([
                {
                    Household_ID: HouseholdID,
                    Congregation_ID: SiteID
                }
            ])
            .then(response => {
                return {
                    id: response.data[0].Congregation_ID,
                    name: response.data[0].Congregation_Name
                };
            })
    }

    public getLifeStage(UserID: number, Mongo: Mongo): Promise<ILifeStage> {
        const db = Mongo.client.db('personalization');
        const collection = db.collection('users');
        return collection.findOne({ userId: UserID }, { lifeStage: true }).then((document) => {
            return document.lifeStage
        });
    }
}
