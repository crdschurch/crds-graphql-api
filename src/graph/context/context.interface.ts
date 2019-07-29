import { IAuthData } from "../auth/auth.interface";
import { IUsersConnector } from "../users/users.interface";
import { ISitesConnector } from "../sites/sites.interface";

export interface IContext {
    authData: IAuthData
    dataSources: {
        usersConnector: IUsersConnector
        sitesConnector: ISitesConnector
    }
}
