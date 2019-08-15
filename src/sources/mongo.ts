const MongoClient = require('mongodb').MongoClient;
import { injectable } from 'inversify';

@injectable()
export class Mongo {
    public client: any;

    constructor() {
        MongoClient.connect(`${process.env.COSMOS_CONNECTION_STRING}`,
            (err, db) => {
                this.client = db;
            });
    }
}
