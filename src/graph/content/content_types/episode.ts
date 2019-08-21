import { ContentUtils } from "../content_utils";
import Content from "./content.base";
import Podcast from "./podcast";
import { IContentReferences } from "../content.interface";

export default class Episode extends Content {
    public duration: string;
    public date: string;
    public podcast: Podcast;
    public transcription: string;

    constructor(entry) {
        super(entry);

        var fields = entry.fields;
        this.duration = ContentUtils.formatDuration(fields.duration);
        this.date = ContentUtils.formatDate(fields.published_at);
        this.transcription = fields.transcription;
        this.podcast = new Podcast(fields.podcast);
    }

    public getReferences(): Promise<IContentReferences> {
        this.references.imageUrl = this.podcast.image;
        this.references.qualifiedUrl = `${process.env.CRDS_MEDIA_ENDPOINT}/podcasts/${this.podcast.slug}/${this.slug}`;
        return new Promise((resolve, reject) => {
            resolve(this.references);
        });
    }
}

