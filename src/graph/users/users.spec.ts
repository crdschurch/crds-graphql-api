import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server-express';
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
    container.rebind<MockUsersConnector>(Types.UsersConnector)
        .to(MockUsersConnector);
    container.rebind<MockAuthConnector>(Types.AuthConnector)
        .to(MockAuthConnector);

    const authConnector: IAuthConnector = container.get<IAuthConnector>(Types.AuthConnector);

    const server = new ApolloServer({
        typeDefs: schema,
        resolvers: resolvers,
        context: () => (authConnector.authenticate('fakeTokenDoesntMatter')),
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
    container.rebind<MockUsersConnector>(Types.UsersConnector)
        .to(MockUsersConnector);
    container.rebind<MockAuthConnector>(Types.AuthConnector)
        .to(MockAuthConnector);

    const authConnector: IAuthConnector = container.get<IAuthConnector>(Types.AuthConnector);

    const server = new ApolloServer({
        typeDefs: schema,
        resolvers: resolvers,
        context: () => (authConnector.authenticate('fakeTokenDoesntMatter')),
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
          console.log(res.data.user.groups);
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
    container.rebind<MockUsersConnector>(Types.UsersConnector)
        .to(MockUsersConnector);
    container.rebind<MockAuthConnector>(Types.AuthConnector)
        .to(MockAuthConnector);

    const authConnector: IAuthConnector = container.get<IAuthConnector>(Types.AuthConnector);

    const server = new ApolloServer({
        typeDefs: schema,
        resolvers: resolvers,
        context: () => (authConnector.authenticate('fakeTokenDoesntMatter')),
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
