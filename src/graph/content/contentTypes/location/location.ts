import Content from "../../content.base";

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

    public getQualifiedUrl(): Promise<string> {
        return new Promise((resolve, reject) => {
            resolve(`${process.env.CRDS_APP_CLIENT_ENDPOINT}/${this.slug}`);
        });
    }
}
