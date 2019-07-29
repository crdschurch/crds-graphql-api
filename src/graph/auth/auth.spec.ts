import { IAuthConnector } from "./auth.interface";
import container from "../../ioc/inversify.config";
import "reflect-metadata";
import { Types } from "../../ioc/types";
import { injectable } from "inversify";

@injectable()
export class MockAuthConnector implements IAuthConnector {
    public authenticate(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve({
                authData: {
                    CanImpersonate: false,
                    ContactId: 7777294,
                    DonorId: 7748361,
                    Email: "jjanssen@callibrity.com",
                    HouseholdId: 5827106,
                    ParticipantId: 7658964,
                    UserId: 4490059
                }
            });
        })
    }
}

it('fetches MP auth data', async () => {
    const data = await new MockAuthConnector().authenticate('fakeToken');
    expect(data).toMatchObject({
        authData: {
            CanImpersonate: false,
            ContactId: 7777294,
            DonorId: 7748361,
            Email: "jjanssen@callibrity.com",
            HouseholdId: 5827106,
            ParticipantId: 7658964,
            UserId: 4490059
        }
    });
});
