import { IAuthData } from "../auth/auth.interface";
import { IUsersConnector } from "../users/users.interface";
import { ISitesConnector } from "../sites/sites.interface";
import { ILifeStageConnector } from "../life-stages/life-stage.interface";
import { Analytics } from "../../config/analytics";
import { Logger } from "../../config/logging";
import { IContentConnector } from "../content/content.interface";

export interface IContext {
    authData: IAuthData
    dataSources: {
        usersConnector: IUsersConnector
        sitesConnector: ISitesConnector
        lifeStageConnector: ILifeStageConnector,
        contentConnector: IContentConnector,
        analytics: Analytics,
        logger: Logger
    }
}
