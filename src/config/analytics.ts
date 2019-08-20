import { injectable } from "inversify";
const Astronomer = require('astronomer');

@injectable()
export class Analytics {
    public client: AnalyticsClient;

    constructor() {
        this.client = new Astronomer(process.env.METAROUTER_SOURCE_ID);
    }
}

export interface Event {
    userId: number,
    event: String,
    properties: {}
}

export interface AnalyticsClient {
    track(event: Event);
}
