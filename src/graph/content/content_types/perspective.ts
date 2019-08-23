import Content from "./content.base";
import { ContentUtils } from "../content_utils";
import Author, { getAuthors } from "./author";

export default class Perpective extends Content {
    public authors: Author[];
    public date: string;
    constructor(entry) {
        super(entry);

        var fields = entry.fields;
        this.authors = getAuthors(fields.author);
        this.date = ContentUtils.formatDate(fields.published_at);
        this.description = ContentUtils.removeMarkdown(fields.body.substring(0, fields.body.indexOf('\n\n') || fields.body.indexOf('\n')));
    }
}

