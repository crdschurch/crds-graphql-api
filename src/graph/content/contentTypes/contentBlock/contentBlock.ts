import Content from "../../content.base";

export default class Author extends Content {

  public content: string;
  public type: string;
  public category: string;

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.title = fields.title;
    this.content = fields.content;
    this.type = fields.type;
    this.category = fields.cateågory;
    this.slug = fields.slug;
  }
}
