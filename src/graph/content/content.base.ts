import { IContent } from "./content.interface";
import { ContentUtils } from "./content_utils";

export default class Content implements IContent {

    public title: string;
    public contentType: string;
    public category: string;
    public tags: string[];
    public description: string;
    public slug: string;
    public interaction_count: number;
    public id: string;
    public imageUrl: string;

    constructor(entry) {
        var fields = entry.fields;
        this.title = fields.title;
        this.contentType = entry.sys.contentType.sys.id;
        this.category = fields.category &&  fields.category.fields ? fields.category.fields.title : null;
        this.tags = fields.tags ? fields.tags.map(t => t.fields ? t.fields.title : null) : null;
        this.description = fields.description;
        this.imageUrl = fields.image && fields.image.fields ? ContentUtils.getImgixURL(fields.image.fields.file.url) : null;
        this.interaction_count = fields.interaction_count;
        this.id = entry.sys.id;
        this.slug = fields.slug;
    }

    public getQualifiedUrl(): Promise<string> {
        return new Promise((resolve, reject) => {
            resolve(`${process.env.CRDS_MEDIA_ENDPOINT}/${this.contentType}s/${this.slug}`);
        });
    }
}
