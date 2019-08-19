const axios = require("axios");
import { injectable } from "inversify";
import { IAuthConnector, IAuthData } from './auth.interface';

@injectable()
export class AuthConnector implements IAuthConnector {
    constructor() {
    }

    public authenticate(token): Promise<IAuthData> {
        const config = {
            headers: {
                'Authorization': token
            }
        };
        return axios.get(`${process.env.AUTH_SERVICE_BASE_URL}/api/authorize`, config)
            .then(authResponse => {
                if(!authResponse.data) return null;
                return {
                    authData: authResponse.data.UserInfo.Mp
                };
            }).catch(error => {
                return null;
            });
    }
}
