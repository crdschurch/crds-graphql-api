export interface IAuthConnector {
    authenticate(token: string): Promise<any>
}

export interface IAuthData { 
    CanImpersonate: boolean,
    ContactId: number,
    DonorId: number,
    Email: string,
    HouseholdId: number,
    ParticipantId: number,
    UserId: number
}
