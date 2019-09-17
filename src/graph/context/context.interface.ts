import { IAuthData } from "../auth/auth.interface";
import { IUsersConnector } from "../users/users.interface";
import { ISitesConnector } from "../sites/sites.interface";
import { Analytics } from "../../config/analytics";
import { Logger } from "../../config/logging";
import { IContentConnector } from "../content/content.interface";
import { IGroupsConnector } from "../groups/groups.interface";

export interface IContext {
    authData: IAuthData
    dataSources: {
        usersConnector: IUsersConnector,
        sitesConnector: ISitesConnector,
        contentConnector: IContentConnector,
        groupsConnector: IGroupsConnector,
        analytics: Analytics,
        logger: Logger
    }
}
