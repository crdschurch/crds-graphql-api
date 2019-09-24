import { createTestClient } from "apollo-server-testing";
import { ApolloServer, ValidationError } from "apollo-server-express";
import schema from "../../schema";
import resolvers from "../../resolvers";
import { injectable } from "inversify";
import { ISite } from "../sites/sites.interface";
import { IGroup } from "../groups/groups.interface";
import { MockAuthConnector } from "../auth/auth.spec";
import { ILifeStage } from "../content/contentTypes/lifeStage/lifeStage.interface";
import { IUsersAPI, IContact, IUsersMongo } from "./users.interface";

@injectable()
export class MockUsersConnector implements IUsersAPI {
  public getCongregation(HouseholdID: number): Promise<ISite> {
    return new Promise((resolve, reject) => {
      resolve({ id: 1, name: "Oakley" });
    });
  }

  public getGroups(UserID: number): Promise<IGroup[]> {
    return new Promise((resolve, reject) => {
      resolve([
        {
          id: 1,
          name: "test group",
          endDate: "2019-03-01",
          url: "group/url",
          role: {
            id: 1,
            name: "my role"
          },
          type: {
            id: 1,
            name: "my type"
          },
          meeting: {
            day: "Sunday",
            time: "17:30:00",
            frequency: "Weekly"
          },
          leader: {
            id: 1
          },
          image: "fireStoreUrl"
        }
      ]);
    });
  }

  public setCongregation(HouseholdID: number, SiteID: number): Promise<ISite> {
    return new Promise((resolve, reject) => {
      resolve({ id: 1, name: "Oakley" });
    });
  }

  public getContactDetails(ContactID: number): Promise<IContact> {
    return new Promise((resolve, reject) => {
      resolve({
        firstName: "Bob",
        nickName: "Bobby Boy",
        lastName: "Bob2",
        gender: "male",
        maritalStatus: "single"
      });
    });
  }
}

export class MockUsersMongo implements IUsersMongo {
  public setLifeStage(UserID: number, LifeStage: ILifeStage): Promise<ILifeStage> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  public getLifeStage(UserID: number): Promise<ILifeStage> {
    return null;
  }
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  context: () => new MockAuthConnector().authenticate("fakeToken"),
  dataSources: (): any => ({ usersAPI: new MockUsersConnector(), usersMongo: new MockUsersMongo() })
});

it("fetches single user with site", async () => {
  const { query } = createTestClient(server);
  const res = await query({
    query: `{
            user {
              site{
                id
                name
              }
            }
          }
          `
  });
  expect(res.data).toMatchObject({
    user: {
      site: {
        id: "1",
        name: "Oakley"
      }
    }
  });
});

it("fetches single user with groups", async () => {
  const { query } = createTestClient(server);
  const res = await query({
    query: `{
            user {
              groups {
                id
								name
								endDate
                role {
									id
									name
								}
                type{
									id
									name
								}
              }
            }
          }
          `
  });

  expect(res.data).toMatchObject({
    user: {
      groups: [
        {
          id: "1",
          name: "test group",
          endDate: "2019-03-01",
          role: {
            id: 1,
            name: "my role"
          },
          type: {
            id: 1,
            name: "my type"
          }
        }
      ]
    }
  });
});

it("fetches single user with site and groups", async () => {
  const { query } = createTestClient(server);
  const res = await query({
    query: `{
            user {
              site {
                id
                name
              }
              groups {
                id
                name
                role {
									id
									name
								}
                type{
									id
									name
								}
              }
            }
          }
          `
  });
  expect(res.data).toMatchObject({
    user: {
      site: {
        id: "1",
        name: "Oakley"
      },
      groups: [
        {
          id: "1",
          name: "test group",
          role: {
            id: 1,
            name: "my role"
          },
          type: {
            id: 1,
            name: "my type"
          }
        }
      ]
    }
  });
});

it("tries to get undefined property on users schema", async () => {
  const { query } = createTestClient(server);
  const res = await query({
    query: `{
            user {
              site {
                id
                name
              }
              groups {
                id
                name
                role {
									id
									name
								}
                type{
									id
									name
								}
                test
              }
            }
          }
          `
  });
  expect(res.errors).toMatchObject([new ValidationError(`Cannot query field "test" on type "Group".`)]);
});

it("fetches a users first name and nick name", async () => {
  const { query } = createTestClient(server);
  const res = await query({
    query: `{
            	user {
									firstName
                  nickName
                  lastName
                  gender
                  maritalStatus
							}
						}
          `
  });

  expect(res.data).toMatchObject({
    user: {
      firstName: "Bob",
      nickName: "Bobby Boy",
      lastName: "Bob2",
      gender: "male",
      maritalStatus: "single"
    }
  });
});
