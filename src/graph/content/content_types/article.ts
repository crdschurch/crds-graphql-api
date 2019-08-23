import { ContentUtils } from "../content_utils";
import Content from "./content.base";
import Author, { getAuthors } from "./author";

export default class Article extends Content {
  public authors: Author[];
  public duration: string;
  public date: string;
  public likes: number;

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.authors = getAuthors(fields.author);
    this.duration = ContentUtils.formatDuration(fields.duration);
    this.description = ContentUtils.removeMarkdown(fields.body.substring(0, fields.body.indexOf('\n\n') || fields.body.indexOf('\n')));
    this.date = ContentUtils.formatDate(fields.published_at);
    this.likes = fields.likes;
  }
}

