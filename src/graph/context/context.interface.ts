import { IAuthData } from "../auth/auth.interface";
import { IUsersConnector } from "../users/users.interface";
import { ISitesConnector } from "../sites/sites.interface";
import { ILifeStageConnector } from "../life-stages/life-stage.interface";
import { Analytics } from "../../config/analytics";
import { Logger } from "../../config/logging";

export interface IContext {
    authData: IAuthData
    dataSources: {
        usersConnector: IUsersConnector
        sitesConnector: ISitesConnector
        lifeStageConnector: ILifeStageConnector,
        analytics: Analytics,
        logger: Logger
    }
}
