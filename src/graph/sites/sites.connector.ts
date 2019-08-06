import { injectable } from "inversify";
import { ISite, ISitesConnector } from "./sites.interface";
const MP = require("ministry-platform");

@injectable()
export class SitesConnector implements ISitesConnector {

    public getSites(filter?: string): Promise<ISite[]> {
        const mp = new MP();
        return mp
            .withSelectColumns([
                "[Congregation_ID]",
                "[Congregation_Name]"
            ])
            .withFilter(filter || '')
            .fromTable('Congregations')
            .get()
            .then(response => {
                return response.data.map(site => {
                    return {
                        id: site.Congregation_ID,
                        name: site.Congregation_Name
                    };
                });
            }).catch(err => {
                console.log(err);
            })
    }
}
