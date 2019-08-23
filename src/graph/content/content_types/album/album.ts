import { ContentUtils } from "../../content_utils";
import Content from "../../content.base";
import Author, { getAuthors } from "../author/author";

export default class Album extends Content {
  public authors: Author[];
  public duration: string;
  public date: string;
  public referenceContent: any;

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.authors = getAuthors(fields.author);
    this.duration = ContentUtils.formatDuration(fields.duration);
    this.date = ContentUtils.formatDate(fields.published_at);
  }

  public getQualifiedUrl(): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(`${process.env.CRDS_MUSIC_ENDPOINT}/music/${this.slug}`);
    });
  }
}

