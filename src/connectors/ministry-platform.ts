import { json } from "body-parser";

const MP = require("ministry-platform");

//TO-DO: Make MP folder and separate out byyyyyyy schemas maybe?
function getCongregation(HouseholdID: number) {
  const filter = `Households.[Household_ID] = ${HouseholdID}`;
  const table = "Households";
  const mp = new MP();
  return mp
    .withSelectColumns([
      "Congregation_ID_Table.[Congregation_ID]",
      "Congregation_ID_Table.[Congregation_Name]"
    ])
    .withFilter(filter)
    .fromTable(table)
    .get()
    .then(response => {
      return {
        id: response.data[0].Congregation_ID,
        name: response.data[0].Congregation_Name
      };
    });
}

function getGroups(ParticipantID: number) {
  const filter = `Group_Participants.[Participant_ID] = ${ParticipantID}`;
  const table = "Group_Participants";
  const mp = new MP();
  return mp
    .withSelectColumns([
      "Group_Participants.[Group_Role_ID]",
      "Group_ID_Table.[Group_ID]",
      "Group_ID_Table.[Group_Name]",
      "Group_ID_Table.[Group_Type_ID]"
    ])
    .withFilter(filter)
    .fromTable(table)
    .get()
    .then(response => {
      return response.data.map(group => {
        return {
          id: group.Group_ID,
          name: group.Group_Name,
          role: group.Group_Role_ID,
          type: group.Group_Type_ID
        };
      });
    });
}

function setCongregation(HouseholdID: number, SiteID: number) {
  const mp = new MP();
  return mp
    .fromTable(`households`)
    .put([
      {
        Household_ID: HouseholdID,
        Congregation_ID: SiteID
      }
    ])
    .then(response => {
      return {
        id: response.data[0].Congregation_ID,
        name: response.data[0].Congregation_Name
      };
    });
}

export { getCongregation, setCongregation, getGroups };
