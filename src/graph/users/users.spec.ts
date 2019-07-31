import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, ValidationError } from 'apollo-server-express';
import schema from '../../schema';
import resolvers from '../../resolvers';
import { injectable } from 'inversify';
import { IUsersConnector } from './users.interface';
import { ISite } from '../sites/sites.interface';
import { IGroup } from '../groups/groups.interface';
import container from "../../ioc/inversify.config";
import "reflect-metadata";
import { Types } from '../../ioc/types';
import { MockAuthConnector } from '../auth/auth.spec';
import { IAuthConnector } from '../auth/auth.interface';

@injectable()
export class MockUsersConnector implements IUsersConnector {
    public getCongregation(HouseholdID: number): Promise<ISite> {
        return new Promise((resolve, reject) => {
            resolve({ id: 1, name: 'Oakley' });
        })
    }

    public getGroups(ParticipantID: number): Promise<IGroup[]> {
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
}

it('fetches single user with site', async () => {
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers: resolvers,
        context: () => (new MockAuthConnector().authenticate('fakeTokenDoesntMatter')),
        dataSources: (): any => ({ usersConnector: new MockUsersConnector() })
    });

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
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers: resolvers,
        context: () => (new MockAuthConnector().authenticate('fakeTokenDoesntMatter')),
        dataSources: (): any => ({ usersConnector: new MockUsersConnector() })
    });

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
                type: "2"
            }]
        }
    });
});

it('fetches single user with site and groups', async () => {
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers: resolvers,
        context: () => (new MockAuthConnector().authenticate('fakeTokenDoesntMatter')),
        dataSources: (): any => ({ usersConnector: new MockUsersConnector() })
    });

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
                type: "2"
            }]
        }
    });
});

it('tries to get undefined property on users schema', async() => {
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers: resolvers,
        context: () => (new MockAuthConnector().authenticate('fakeTokenDoesntMatter')),
        dataSources: (): any => ({ usersConnector: new MockUsersConnector() })
    });

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
        ]
    )
})
