import Content from "./content.base";
import { IContentReferences } from "../content.interface";

export default class Location extends Content {

    public serviceTimes: string;
    public map_url: string;

    constructor(entry) {
        super(entry);

        var fields = entry.fields;
        this.title = fields.name;
        this.serviceTimes = fields.service_times;
        this.map_url = fields.map_url;
    }

    public getReferences(): Promise<IContentReferences> {
        this.references.imageUrl = this.image;
        this.references.qualifiedUrl = `${process.env.CRDS_APP_CLIENT_ENDPOINT}/${this.slug}`;
        return new Promise((resolve, reject) => {
            resolve(this.references);
        });
    }
}
