import { injectable } from "inversify";
import { IGroupsConnector } from "../groups/groups.interface";
const MP = require("ministry-platform");

@injectable()
export class GroupsConnector implements IGroupsConnector {
  public getGroupImage(ContactID: number): Promise<string> {
    const table = "Participants";
    const filter = `Participants.[Contact_ID] = ${ContactID}`;
    const mp = new MP();
    console.log(ContactID);
    return mp
      .withSelectColumns([
        "Participants.[Participant_ID]"
      ])
      .withFilter(filter)
      .fromTable(table)
      .get()
      .then(response => {
        return `${process.env.GCP_STORAGE_ENDPOINT}/${process.env.GCP_STORAGE_BUCKET}/${response.data[0].Participant_ID}.png`;
      }).catch(err => {
        console.log(err);
      })
  }
}
