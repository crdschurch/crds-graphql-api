import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server-express';
import schema from '../../schema';
import resolvers from '../../resolvers';
import { injectable } from 'inversify';
import { ISite, ISitesAPI } from '../sites/sites.interface';
import "reflect-metadata";
import { MockAuthConnector } from '../auth/auth.spec';

@injectable()
export class MocksSitesConnector implements ISitesAPI {
    public getSites(): Promise<ISite[]> {
        return new Promise((resolve, reject) => {
            resolve([
                {
                    "name": "Oakley",
                    "id": 1
                },
                {
                    "name": "I do not attend Crossroads",
                    "id": 2
                },
                {
                    "name": "Not site specific",
                    "id": 5
                },
                {
                    "name": "Mason",
                    "id": 6
                },
                {
                    "name": "Florence",
                    "id": 7
                },
                {
                    "name": "West Side",
                    "id": 8
                }
            ])
        });
    }
}

it('fetches sites', async () => {
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers: resolvers,
        context: () => (new MockAuthConnector().authenticate('fakeTokenDoesntMatter')),
        dataSources: (): any => ({sitesConnector: new MocksSitesConnector()})
    });

    const { query } = createTestClient(server);
    const res = await query({
        query: `{
            sites {
                id
                name
            }
          }`});

    expect(res.data).toMatchObject({
        sites: [
            {
                "name": "Oakley",
                "id": "1"
            },
            {
                "name": "I do not attend Crossroads",
                "id": "2"
            },
            {
                "name": "Not site specific",
                "id": "5"
            },
            {
                "name": "Mason",
                "id": "6"
            },
            {
                "name": "Florence",
                "id": "7"
            },
            {
                "name": "West Side",
                "id": "8"
            }
        ]
    });
});
