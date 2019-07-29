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
        return axios.get(process.env.AUTH_ENDPOINT, config)
            .then(authResponse => {
                return {
                    authData: authResponse.data.UserInfo.Mp
                };
            })
    }
}


