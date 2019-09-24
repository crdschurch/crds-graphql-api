import { inject } from "inversify";
import { ISite, ISitesAPI } from "./sites.interface";
import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { IMPAuth } from "../../sources/mp";
import { Types } from "../../ioc/types";

export class SitesAPI extends RESTDataSource implements ISitesAPI {
  constructor(@inject(Types.MPAuth) private mpAuth: IMPAuth) {
    super();
    this.baseURL = `${process.env.MP_REST_API_ENDPOINT}/tables/`;
  }

  public async willSendRequest(request: RequestOptions) {
    const token = await this.mpAuth.authorize();
    request.headers.set("Authorization", `Bearer ${token}`);
    request.headers.set("Accept", "application/json");
  }

  public getSites(Available_Online?: boolean): Promise<ISite[]> {
    const filter = Available_Online != null ? `Available_Online = ${Available_Online ? 1 : 0}`: "";
    return this.get("Congregations", {
      $filter: filter
    }).then(data => {
      return data.map(site => {
        return {
          id: site.Congregation_ID,
          name: site.Congregation_Name
        };
      });
    });
  }
}
