import Content from "../../content.base";

export default class Category extends Content {
    constructor(entry) {
        super(entry);
    }

    public getQualifiedUrl(): Promise<string> {
        return new Promise((resolve, reject) => {
            resolve(`${process.env.CRDS_MEDIA_ENDPOINT}/topics/${this.slug}`);
        });
    }
}

