import Content from "./content.base";
import { ContentUtils } from "../content_utils";
import { IContentReferences } from "../content.interface";

export default class Promo extends Content {
  public date: string;

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.slug = fields.link_url;
    this.date = ContentUtils.formatDate(fields.published_at);
    this.description = ContentUtils.removeMarkdown(fields.description);
  }

  public getReferences(): Promise<IContentReferences> {
    this.references.imageUrl = this.image;
    this.references.qualifiedUrl = this.slug;
    return new Promise((resolve, reject) => {
      resolve(this.references);
    });
  }
}

