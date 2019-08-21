import { ContentUtils } from "../content_utils";
import Content from "./content.base";
import { IContentReferences } from "../content.interface";

export default class Page extends Content {
  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.image = fields.meta && fields.meta.fields.image ? ContentUtils.getImgixURL(fields.meta.fields.image.fields.file.url) : this.image;
    this.description = fields.body;
    this.slug = fields.permalink;
  }

  public getReferences(): Promise<IContentReferences> {
    this.references.imageUrl = this.image;
    this.references.qualifiedUrl = `${process.env.CRDS_APP_CLIENT_ENDPOINT}${this.slug}`;
    return new Promise((resolve, reject) => {
      resolve(this.references);
    });
  }
}

