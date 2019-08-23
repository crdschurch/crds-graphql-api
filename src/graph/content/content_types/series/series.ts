import Content from "../../content.base";
import { ContentUtils } from "../../content_utils";

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

    public getQualifiedUrl(): Promise<string> {
        return new Promise((resolve, reject) => {
            resolve(`${process.env.CRDS_MEDIA_ENDPOINT}/${this.contentType}/${this.slug}`);
        });
    }
}
