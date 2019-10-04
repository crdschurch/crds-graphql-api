import { injectable, inject } from "inversify";
import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { IRestAuth } from "../../sources/mp";
import { IGroupsAPI } from "./groups.interface";
import { Types } from "../../ioc/types";

export class GroupsAPI extends RESTDataSource implements IGroupsAPI {
  constructor(@inject(Types.RestAuth) private restAuth: IRestAuth) {
    super();
    this.baseURL = `${process.env.MP_REST_API_ENDPOINT}/tables/`;
  }

  public async willSendRequest(request: RequestOptions) {
    const token = await this.restAuth.authorize();
    request.headers.set("Authorization", `Bearer ${token}`);
    request.headers.set("Accept", "application/json");
  }

  public async getGroupImage(ContactID: number): Promise<string> {
    const filter = `Participants.[Contact_ID] = ${ContactID}`;
    return this.get("Participants", {
      $filter: filter
    }).then(data => {
      return `${process.env.GCP_STORAGE_ENDPOINT}/${process.env.GCP_STORAGE_BUCKET}/${data[0].Participant_ID}.png`;
    });
  }
}
