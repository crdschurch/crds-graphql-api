import { IAuthConnector } from "./auth.interface";
import "reflect-metadata";
import { injectable } from "inversify";

@injectable()
export class MockAuthConnector implements IAuthConnector {
  public authenticate(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve({
        authData: {
          userInfo: {
            CanImpersonate: false,
            ContactId: 7777294,
            DonorId: 7745938,
            Email: "mpcrds+auto+2@gmail.com",
            HouseholdId: 5819396,
            ParticipantId: 7654359,
            UserId: 4488274
          }
        }
      });
    });
  }
}

it("fetches MP auth data", async () => {
  const data = await new MockAuthConnector().authenticate("fakeToken");
  expect(data).toMatchObject({
    authData: {
      userInfo: {
        CanImpersonate: false,
        ContactId: 7777294,
        DonorId: 7745938,
        Email: "mpcrds+auto+2@gmail.com",
        HouseholdId: 5819396,
        ParticipantId: 7654359,
        UserId: 4488274
      }
    }
  });
});
