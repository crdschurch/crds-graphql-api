import Content from "../../content.base";

export default class LifeStage extends Content {

    public contentTotal: number;

    constructor(entry) {
        super(entry);

        var fields = entry.fields;
        this.contentTotal = fields.content.length;
    }
}

