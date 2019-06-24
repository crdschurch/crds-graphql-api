const axios = require("axios");

export function Authentication(token) {
    const config = {
        headers: {
            'Authorization': token
        }
    };
    return axios.get(process.env.AUTH_ENDPOINT, config)
        .then(authResponse => {
            return authResponse.data.UserInfo.Mp;
        })
}
