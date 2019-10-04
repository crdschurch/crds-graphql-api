import { IAuthData } from "../auth/auth.interface";
import { IUsersAPI, IUsersMongo } from "../users/users.interface";
import { Analytics } from "../../config/analytics";
import { Logger } from "../../config/logging";
import { IContentConnector } from "../content/content.interface";
import { IGroupsAPI } from "../groups/groups.interface";
import { ISitesAPI } from "../sites/sites.interface";

export interface IContext {
  authData: IAuthData;
  dataSources: IDataSources;
}

export interface IDataSources {
  usersAPI: IUsersAPI;
  usersMongo: IUsersMongo;
  sitesAPI: ISitesAPI;
  contentConnector: IContentConnector;
  groupsAPI: IGroupsAPI;
  analytics: Analytics;
  logger: Logger;
}
