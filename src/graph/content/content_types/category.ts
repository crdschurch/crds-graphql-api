import Content from "./content.base";
import { IContentReferences } from "../content.interface";

export default class Category extends Content {
    constructor(entry) {
        super(entry);
    }

    public getReferences(): Promise<IContentReferences> {
        this.references.imageUrl = this.image;
        this.references.qualifiedUrl = `${process.env.CRDS_MEDIA_ENDPOINT}/topics/${this.slug}`;
        return new Promise((resolve, reject) => {
            resolve(this.references);
        });
    }
}

