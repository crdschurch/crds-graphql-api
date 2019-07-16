const MP = require('ministry-platform');
const mp = new MP();


//TO-DO: Make MP folder and separate out byyyyyyy schemas maybe? 
function getCongregation(HouseholdID: number) {
    const filter = `Households.[Household_ID] = ${HouseholdID}`
    const table = 'Households'
    return mp
        .withSelectColumns([
            'Congregation_ID_Table.[Congregation_ID]',
            'Congregation_ID_Table.[Congregation_Name]'
        ])
        .withFilter(filter)
        .fromTable(table)
        .get()
        .then(response => {
            return {
                id: response.data[0].Congregation_ID,
                name: response.data[0].Congregation_Name
            }
        })
}

function getGroups(ParticipantID: number) {
    const filter = `Group_Participants.[Group_Participant_ID] = ${ParticipantID}`
    const table = 'Group_Participants'
    return mp
        .withSelectColumns([
            'Group_ID_Table.[Group_ID]',
            'Group_ID_Table.[Group_Name]'
        ])
        .withFilter(filter)
        .fromTable(table)
        .get()
        .then(response => {
            return {
                id: response.data[0].Group_ID,
                name: response.data[0].Group_Name
            }
        })
}

function setCongregation(HouseholdID: number, SiteID: number) {
    return mp
        .fromTable(`households`)
        .put([{
            Household_ID: HouseholdID,
            Congregation_ID: SiteID
        }])
        .then(response => {
            return {
                id: response.data[0].Congregation_ID,
                name: response.data[0].Congregation_Name
            }
        });
}

export { getCongregation, setCongregation, getGroups }; 
