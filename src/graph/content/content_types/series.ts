import Content from "./content.base";
import { ContentUtils } from "../content_utils";
import { IContentReferences } from "../content.interface";

export default class Series extends Content {
    public start_date: string;
    public end_date: string;
    public messages: string[];

    constructor(entry) {
        super(entry);

        var fields = entry.fields;
        this.start_date = ContentUtils.formatDate(fields.starts_at);
        this.end_date = ContentUtils.formatDate(fields.ends_at);
        this.messages = fields.videos ? fields.videos.map(video => video.fields ? video.fields.title : null) : null;
        this.interaction_count = fields.interaction_count;
    }

    public getReferences(): Promise<IContentReferences> {
        this.references.imageUrl = this.image;
        this.references.qualifiedUrl = `${process.env.CRDS_MEDIA_ENDPOINT}/${this.contentType}/${this.slug}`;
        return new Promise((resolve, reject) => {
            resolve(this.references);
        });
    }
}
