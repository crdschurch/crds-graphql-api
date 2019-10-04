const MongoClient = require("mongodb").MongoClient;
import { injectable } from "inversify";

@injectable()
export class Mongo {

  private static client = null;

  public static getClient(): Promise<any> {
    return MongoClient.connect(`${process.env.COSMOS_CONNECTION_STRING}`).then(client => { 
      Mongo.client = client;
      return client;});
  }

  public static async getCollection(collectionName: string) {
    const client = Mongo.client ? Mongo.client : await this.getClient();
    const db = client.db("personalization");
    const collection = db.collection(collectionName);
    return collection;
  }
}
