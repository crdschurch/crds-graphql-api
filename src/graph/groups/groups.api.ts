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

  public async getGroupImage(contactId: number): Promise<string> {
    this.baseURL = `${process.env.MP_REST_API_ENDPOINT}/files/`;
    try {
      const fileMetas = await this.get(`Contacts/${contactId}`);
      const profileImageMeta = fileMetas.find((f) => f.IsDefaultImage);
      if (!profileImageMeta) return null;
      return `https://admin${process.env.ENV_SUBDOMAIN}.crossroads.net/ministryplatformapi/files/${profileImageMeta.UniqueFileId}`;
    } catch (err) {
      return null;
    }
  }
}
