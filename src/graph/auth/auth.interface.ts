export interface IAuthConnector {
    authenticate(token: string): Promise<any>
}
