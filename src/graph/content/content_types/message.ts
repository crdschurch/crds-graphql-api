import Content from "./content.base";
import { ContentUtils } from "../content_utils";
import { IContentReferences } from "../content.interface";
import { Types } from "../../../ioc/types";
import Series from "./series";
import container from "../../../ioc/inversify.config";
import { LifeStageConnector } from "../../life-stages/life-stage.connector";

export default class Message extends Content {
    public duration: string;
    public date: string;

    constructor(entry) {
        super(entry);

        var fields = entry.fields;
        this.duration = ContentUtils.formatDuration(fields.duration);
        this.date = ContentUtils.formatDate(fields.published_at);
    }

    public getReferences(): Promise<IContentReferences> {
        return container.get<LifeStageConnector>(Types.LifeStageConnector)
            .getSeriesDataForMessages(this)
            .then((series: Series) => {
                this.references.imageUrl = this.image;
                this.references.qualifiedUrl = `${process.env.CRDS_MEDIA_ENDPOINT}/series${series ? '/' + series.slug : ''}/${this.slug}`;
                return this.references;
            });
    }
}
