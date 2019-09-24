import { IUser } from "../users/users.interface";

export interface IGroup {
    id: number
    url: string
    name: string
    meeting: Meeting
    role: Role
    type: Type
    leader: IUser
    image: string
    endDate: string
}

export interface Meeting {
    day: string
    time: string
    frequency: string
}

export interface Role {
    id: number
    name: string
}

export interface Type {
    id: number
    name: string
}


export interface IGroupsAPI {
    getGroupImage(ContactID: number): Promise<string>;
}
