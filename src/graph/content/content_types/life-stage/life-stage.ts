import { ContentUtils } from "../../content_utils";
import Content from "../../content.base";
import Podcast from "../podcast/podcast";

export default class LifeStage extends Content {

    public contentTotal: number;

    constructor(entry) {
        super(entry);

        var fields = entry.fields;
        this.contentTotal = fields.content.length;
    }
}

