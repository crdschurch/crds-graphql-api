export interface IAuthConnector {
    authenticate(token: string): Promise<any>
}

export interface IAuthData {
    userInfo: IUserInfo,
    roles: {[key: number]: string},
}

export interface IUserInfo {
    CanImpersonate: boolean,
    ContactId: number,
    DonorId: number,
    Email: string,
    HouseholdId: number,
    ParticipantId: number,
    UserId: number
}
