import { IRestAuth } from "../../sources/mp";
import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { injectable, inject } from "inversify";
import { IContact, IUsersAPI } from "./users.interface";
import { IGroup } from "../groups/groups.interface";
import { ISite } from "../sites/sites.interface";
import { Types } from "../../ioc/types";

export class UsersAPI extends RESTDataSource implements IUsersAPI {
  private baseGroupUrl = `https://${
    process.env.CRDS_ENV === "prod" ? "www" : process.env.CRDS_ENV
  }.crossroads.net/groups/search/small-group`;

  constructor(@inject(Types.RestAuth) private mpAuth: IRestAuth) {
    super();
    this.baseURL = `${process.env.MP_REST_API_ENDPOINT}/tables/`;
  }

  public async willSendRequest(request: RequestOptions) {
    const token = await this.mpAuth.authorize();
    request.headers.set("Authorization", `Bearer ${token}`);
    request.headers.set("Accept", "application/json");
  }

  public async getContactDetails(ContactID: number): Promise<IContact> {
    const filter = `Contacts.[Contact_ID] = ${ContactID}`;
    const select = "Nickname, First_Name, Last_Name, Gender_ID_Table.Gender, Marital_Status_ID_Table.Marital_Status, Email_Address, _Contact_Setup_Date";

    return this.get("Contacts", {
      $filter: filter,
      $select: select
    }).then(data => {
      return {
        nickName: data[0].Nickname,
        firstName: data[0].First_Name,
        lastName: data[0].Last_Name,
        gender: data[0].Gender,
        maritalStatus: data[0].Marital_Status,
        email: data[0].Email_Address,
        created_at: (new Date(data[0]._Contact_Setup_Date).getTime() / 1000)
      };
    });
  }

  public async getCongregation(HouseholdID: number): Promise<ISite> {
    const filter = `Households.[Household_ID] = ${HouseholdID}`;
    const select = `Congregation_ID_Table.[Congregation_ID], Congregation_ID_Table.[Congregation_Name]`;

    return this.get("Households", {
      $filter: filter,
      $select: select
    }).then(data => {
      return {
        id: data[0].Congregation_ID,
        name: data[0].Congregation_Name
      };
    });
  }

  public async getGroups(UserID: number, types?: string[], expired?: boolean): Promise<IGroup[]> {
    var filter = `Group_Participants.[Participant_ID] = ${UserID}`;
    filter += types ? ` AND Group_ID_Table_Group_Type_ID_Table.[Group_Type] ${this.sqlIn(types)}` : "";
    filter +=
      expired != null && !expired
        ? ` AND (Group_ID_Table.[End_Date] > GETDATE() OR Group_ID_Table.[End_Date] is null)
            AND (Group_Participants.[End_Date] > GETDATE() OR Group_Participants.[End_Date] is null)`
        : "";

    filter += expired
      ? ` AND (Group_ID_Table.[End_Date] < GETDATE() OR Group_Participants.[End_Date] < GETDATE())`
      : "";

    const select = `Group_Participants.[Group_Role_ID] as GroupRoleID,
                    Group_Role_ID_Table.[Role_Title] as RoleTitle,
                    Group_ID_Table.[Meeting_Time],
                    Group_ID_Table_Meeting_Day_ID_Table.[Meeting_Day],
                    Group_ID_Table_Meeting_Frequency_ID_Table.[Meeting_Frequency],
                    Group_ID_Table.[Group_ID],
                    Group_ID_Table.[Group_Name],
                    Group_ID_Table.[Group_Type_ID] as GroupTypeID,
                    Group_ID_Table_Group_Type_ID_Table.[Group_Type] as GroupTypeName,
                    Group_ID_Table.[Primary_Contact],
                    Group_ID_Table.[End_Date]`;

    return this.get("Group_Participants", {
      $filter: filter,
      $select: select
    }).then(data => {
      return data.map(group => {
        return {
          id: group.Group_ID,
          url: `${this.baseGroupUrl}/${group.Group_ID}`,
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

  public async setCongregation(HouseholdID: number, SiteID: number): Promise<ISite> {
    return this.put("Households", [
      {
        Household_ID: HouseholdID,
        Congregation_ID: SiteID
      }
    ]).then(data => {
      return {
        id: data[0].Congregation_ID,
        name: data[0].Congregation_Name
      };
    });
  }

  private sqlIn(arr: string[]) {
    return "in ('" + arr.join("','") + "')";
  }
}
