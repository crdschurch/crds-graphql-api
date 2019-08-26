import { IAuthData } from "../graph/auth/auth.interface";

export function authorize(authData: IAuthData, roles?: string[]): void {
    if ((!roles || !roles.length) && authData.userInfo) return;
    if (!Object.keys(authData.roles)
        .find(role =>
            roles.indexOf(authData.roles[role]) > -1))
        throw new Error('Unauthorized.');
}
