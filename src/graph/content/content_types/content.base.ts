import { IContent, IContentReferences } from "../content.interface";
import { ContentUtils } from "../content_utils";

export default class Content implements IContent {

    public title: string;
    public contentType: string;
    public category: string;
    public tags: string[];
    public description: string;
    public slug: string;
    public interaction_count: number;
    public objectID: string;
    public id: string;
    public references: IContentReferences;
    public image: string;

    constructor(entry) {
        var fields = entry.fields;
        this.title = fields.title;
        this.contentType = entry.sys.contentType.sys.id;
        this.category = fields.category ? fields.category.fields.title : null;
        this.tags = fields.tags ? fields.tags.map(t => t.fields ? t.fields.title : null) : null;
        this.description = fields.description;
        this.image = fields.image && fields.image.fields ? ContentUtils.getImgixURL(fields.image.fields.file.url) : null;
        this.interaction_count = fields.interaction_count;
        this.objectID = entry.sys.id;
        this.id = entry.sys.id;
        this.slug = fields.slug;

        this.references = {
            imageUrl: null,
            qualifiedUrl: null
        };
    }

    public getReferences(): Promise<IContentReferences> {
        this.references.imageUrl = this.image;
        this.references.qualifiedUrl = `${process.env.CRDS_MEDIA_ENDPOINT}/${this.contentType}s/${this.slug}`;
        return new Promise((resolve, reject) => {
            resolve(this.references);
        });
    }
}
