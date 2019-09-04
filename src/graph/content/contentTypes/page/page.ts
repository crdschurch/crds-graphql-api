import { ContentUtils } from "../../content_utils";
import Content from "../../content.base";

export default class Page extends Content {
  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.imageUrl = fields.meta && fields.meta.fields.image ? ContentUtils.getImgixURL(fields.meta.fields.image.fields.file.url) : this.imageUrl;
    this.description = fields.body;
    this.slug = fields.permalink;
  }

  public getQualifiedUrl(): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(`${process.env.CRDS_APP_CLIENT_ENDPOINT}${this.slug}`);
    });
  }
}

