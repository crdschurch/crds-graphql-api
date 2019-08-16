import { IAuthData } from "../auth/auth.interface";
import { IUsersConnector } from "../users/users.interface";
import { ISitesConnector } from "../sites/sites.interface";
import { ILifeStageConnector } from "../life-stages/life-stage.interface";
import { Mongo } from "../../sources/mongo";

export interface IContext {
    authData: IAuthData
    dataSources: {
        usersConnector: IUsersConnector
        sitesConnector: ISitesConnector
        lifeStageConnector: ILifeStageConnector,
    }
}
