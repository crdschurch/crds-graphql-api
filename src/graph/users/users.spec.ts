import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, ValidationError } from 'apollo-server-express';
import schema from '../../schema';
import resolvers from '../../resolvers';
import { injectable } from 'inversify';
import { IUsersConnector } from './users.interface';
import { ISite } from '../sites/sites.interface';
import { IGroup } from '../groups/groups.interface';
import "reflect-metadata";
import { MockAuthConnector } from '../auth/auth.spec';
import { ILifeStage } from '../content/content_types/life-stage/life-stage.interface';
import { IContact } from './contact/contact.interface';

@injectable()
export class MockUsersConnector implements IUsersConnector {
	public getCongregation(HouseholdID: number): Promise<ISite> {
		return new Promise((resolve, reject) => {
			resolve({ id: 1, name: 'Oakley' });
		})
	}

	public getGroups(UserID: number): Promise<IGroup[]> {
		return new Promise((resolve, reject) => {
			resolve([{
				id: 1,
				name: 'test group',
				role: 'member',
				type: 2
			}]);
		})
	}

	public setCongregation(HouseholdID: number, SiteID: number): Promise<ISite> {
		return new Promise((resolve, reject) => {
			resolve({ id: 1, name: 'Oakley' });
		});
	}


	public setLifeStage(UserID: number, LifeStage: ILifeStage): Promise<ILifeStage> {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}

	public getLifeStage(UserID: number): Promise<ILifeStage> {
		return null;
	}

	public getContactDetails(ContactID: number): Promise<IContact> {
		return new Promise((resolve, reject) => {
			resolve({
				firstName: 'Bob',
				nickName: 'Bobby Boy'
			})
		})
	}
}

const server = new ApolloServer({
	typeDefs: schema,
	resolvers: resolvers,
	context: () => (new MockAuthConnector().authenticate('fakeToken')),
	dataSources: (): any => ({ usersConnector: new MockUsersConnector() })
});

it('fetches single user with site', async () => {
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
          ` });
	expect(res.data).toMatchObject({
		user: {
			site: {
				id: "1",
				name: "Oakley"
			}
		}
	});
});

it('fetches single user with groups', async () => {
	const { query } = createTestClient(server);
	const res = await query({
		query: `{
            user {
              groups {
                id
                name
                role
                type
              }
            }
          }
          ` });

	expect(res.data).toMatchObject({
		user: {
			groups: [{
				id: "1",
				name: 'test group',
				role: 'member',
				type: 2
			}]
		}
	});
});

it('fetches single user with site and groups', async () => {
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
                role
                type
              }
            }
          }
          ` });
	expect(res.data).toMatchObject({
		user: {
			site: {
				id: "1",
				name: "Oakley"
			},
			groups: [{
				id: "1",
				name: 'test group',
				role: 'member',
				type: 2
			}]
		}
	});
});

it('tries to get undefined property on users schema', async () => {
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
                role
                type
                test
              }
            }
          }
          ` });
	expect(res.errors).toMatchObject([
		new ValidationError(`Cannot query field "test" on type "Group".`)
	])
})

it('fetches a users first name and nick name', async () => {
	const { query } = createTestClient(server);
	const res = await query({
		query: `{
            	user {
								contact {
									firstName
									nickName
								}
							}
						}
          ` });

	expect(res.data).toMatchObject({
		user: {
			contact: {
				firstName: 'Bob',
				nickName: 'Bobby Boy'
			}
		}
	});
})
