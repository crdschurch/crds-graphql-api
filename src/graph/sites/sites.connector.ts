import { injectable } from "inversify";
import { ISite, ISitesConnector } from "./sites.interface";
const MP = require("ministry-platform");

@injectable()
export class SitesConnector implements ISitesConnector {
    
    public getSites(): Promise<ISite[]> {
        const mp = new MP();
        return mp
            .withSelectColumns([
                "Congregations.[Congregation_ID]",
                "Congregations.[Congregation_Name]"
            ])
            .fromTable('congregations')
            .get()
            .then(response => {
                return response.data.map(site => {
                    return {
                        id: site.Congregation_ID,
                        name: site.Congregation_Name
                    };
                });
            });
    }
}
