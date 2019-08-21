import Content from "./content.base";
import { ContentUtils } from "../content_utils";
import { IContentReferences } from "../content.interface";
import Album from "./album";

export default class Song extends Content {
    public duration: string;
    public date: string;
    public album: Album;

    constructor(entry) {
        super(entry);

        var fields = entry.fields;
        this.duration = ContentUtils.formatDuration(fields.duration);
        this.date = ContentUtils.formatDate(fields.published_at);
        this.description = fields.lyrics;
        this.album = new Album(fields.album);
        this.image = fields.bg_image && fields.bg_image.fields ? ContentUtils.getImgixURL(fields.bg_image.fields.file.url) : null;
    }

    public getReferences(): Promise<IContentReferences> {
        this.references.imageUrl = this.image || this.album.image;
        this.references.qualifiedUrl = this.album ? `${process.env.CRDS_MUSIC_ENDPOINT}/music/${this.album.slug}/${this.slug}` : `${process.env.CRDS_MEDIA_ENDPOINT}/${this.contentType}s/${this.slug}`;
        return new Promise((resolve, reject) => {
            resolve(this.references);
        });
    }
}
