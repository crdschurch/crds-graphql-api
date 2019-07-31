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
                    DonorId: 7745938,
                    Email: "mpcrds+auto+2@gmail.com",
                    HouseholdId: 5819396,
                    ParticipantId: 7654359,
                    UserId: 4488274
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
            DonorId: 7745938,
            Email: "mpcrds+auto+2@gmail.com",
            HouseholdId: 5819396,
            ParticipantId: 7654359,
            UserId: 4488274
        }
    });
});
