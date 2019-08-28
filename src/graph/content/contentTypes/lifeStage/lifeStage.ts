import Content from "../../content.base";
import { IContent } from "../../content.interface";
import { ContentFactory } from "../../content.factory";

export default class LifeStage extends Content {

    public contentTotal: number;
    public content: IContent[];

    constructor(entry) {
        super(entry);

        var fields = entry.fields;
        this.contentTotal = fields.content.length;
        this.content = fields.content.map(content => ContentFactory.instantiate(content));
    }
}
