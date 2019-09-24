import axios from "axios";
import querystring from "querystring";
import jwt from "jsonwebtoken";
import { injectable } from "inversify";

@injectable()
export class MPAuth implements IMPAuth {
  private static clientToken: string = null;

  public async authorize(): Promise<string> {
    return !this.isExpired() ? MPAuth.clientToken : this.getAccessToken();
  }

  private getAccessToken(): Promise<string> {
    const url = `${process.env.MP_OAUTH_BASE_URL}/connect/token`;
    const data = querystring.stringify({
      grant_type: "client_credentials",
      scope: "http://www.thinkministry.com/dataplatform/scopes/all",
      client_id: process.env.MP_CLIENT_ID,
      client_secret: process.env.MP_CLIENT_SECRET
    });
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    return axios.post(url, data, config).then(res => {
      MPAuth.clientToken = res.data.access_token;
      return MPAuth.clientToken;
    });
  }

  private isExpired(): boolean {
    if (!MPAuth.clientToken) return true;
    return jwt.decode(MPAuth.clientToken).exp < new Date().getTime() / 1000;
  }
}

export interface IMPAuth {
  authorize(): Promise<string>
}
