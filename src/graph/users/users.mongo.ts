import { MongoDataSource } from "apollo-datasource-mongodb";
import { ILifeStage } from "../content/contentTypes/lifeStage/lifeStage.interface";

export class UsersMongo extends MongoDataSource {
  constructor(config) {
    super(config);
  }

  public getLifeStage(UserID: number): Promise<ILifeStage> {
    return (<any>this).usersCollection.findOne({ userId: UserID }, { lifeStage: true }).then(document => {
      if (!document) return null;
      return document.lifeStage;
    });
  }

  public setLifeStage(UserID: number, lifeStage?: ILifeStage): Promise<ILifeStage> {
    return (<any>this).usersCollection
      .updateOne({ userId: UserID }, { $set: { lifeStage: lifeStage } }, { upsert: true })
      .then(document => {
        return this.getLifeStage(UserID);
      });
  }
}
