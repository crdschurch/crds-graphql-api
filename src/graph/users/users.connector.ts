import { injectable, inject } from "inversify";
import { ISite } from "../sites/sites.interface";
import { IGroup } from "../groups/groups.interface";
import { IUsersConnector, IUser } from "./users.interface";
import { Mongo } from "../../sources/mongo";
import { ILifeStage } from "../content/contentTypes/lifeStage/lifeStage.interface";
import { Types } from "../../ioc/types";
import { IContact } from "./contact/contact.interface";

const MP = require("ministry-platform");

@injectable()
export class UsersConnector implements IUsersConnector {
  constructor(@inject(Types.Mongo) private mongo: Mongo) {}

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

  public getGroups(UserID: number, types?: string[], expired?: boolean): Promise<IGroup[]> {
    var filter = `Group_Participants.[Participant_ID] = ${UserID}`;
    filter += types ? ` AND Group_ID_Table_Group_Type_ID_Table.[Group_Type] in (${"'" + types.join("','") + "'"})` : '';
    filter += expired != null && !expired ? ` AND (Group_ID_Table.[End_Date] > GETDATE() OR Group_ID_Table.[End_Date] is null)` : '';
    const table = "Group_Participants";
    const mp = new MP();
    return mp
      .withSelectColumns([
        "Group_Participants.[Group_Role_ID] as GroupRoleID",
        "Group_Role_ID_Table.[Role_Title] as RoleTitle",
        "Group_ID_Table.[Meeting_Time]",
        "Group_ID_Table_Meeting_Day_ID_Table.[Meeting_Day]",
        "Group_ID_Table_Meeting_Frequency_ID_Table.[Meeting_Frequency]",
        "Group_ID_Table.[Group_ID]",
        "Group_ID_Table.[Group_Name]",
        "Group_ID_Table.[Group_Type_ID] as GroupTypeID",
        "Group_ID_Table_Group_Type_ID_Table.[Group_Type] as GroupTypeName",
        "Group_ID_Table.[Primary_Contact]"
      ])
      .withFilter(filter)
      .fromTable(table)
      .get()
      .then(response => {
        return response.data.map(group => {
          return {
            id: group.Group_ID,
            name: group.Group_Name,
            endDate: group.End_Date,
            meeting: {
              day: group.Meeting_Day,
              time: group.Meeting_Time,
              frequency: group.Meeting_Frequency
            },
            role: {
              id: group.GroupRoleID,
              name: group.RoleTitle
            },
            type: {
              id: group.GroupTypeID,
              name: group.GroupTypeName
            },
            leader: {
              id: group.Primary_Contact
            }
          };
        });
      });
  }

  public setCongregation(HouseholdID: number, SiteID: number): Promise<ISite> {
    const mp = new MP();
    return mp
      .fromTable("households")
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
      });
  }

  public getLifeStage(UserID: number): Promise<ILifeStage> {
    const db = this.mongo.client.db("personalization");
    const collection = db.collection("users");
    return collection
      .findOne({ userId: UserID }, { lifeStage: true })
      .then(document => {
        if (!document) return null;
        return document.lifeStage;
      });
  }

  public setLifeStage(
    UserID: number,
    lifeStage?: ILifeStage
  ): Promise<ILifeStage> {
    const db = this.mongo.client.db("personalization");
    const collection = db.collection("users");
    return collection
      .updateOne(
        { userId: UserID },
        { $set: { lifeStage: lifeStage } },
        { upsert: true }
      )
      .then(document => {
        return this.getLifeStage(UserID);
      });
  }

  public getContactDetails(ContactID: number): Promise<IContact> {
    const filter = `Contacts.[Contact_ID] = ${ContactID}`;
    const table = `Contacts`;
    const mp = new MP();
    return mp
      .fromTable(table)
      .withFilter(filter)
      .get()
      .then(response => {
        return {
          nickName: response.data[0].Nickname,
          firstName: response.data[0].First_Name,
          lastName: response.data[0].Last_Name
        };
      });
  }
}
