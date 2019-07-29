import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server-express';
import schema from '../../schema';
import resolvers from '../../resolvers';
import { injectable } from 'inversify';
import { ISite, ISitesConnector } from '../sites/sites.interface';
import container from "../../ioc/inversify.config";
import "reflect-metadata";
import { Types } from '../../ioc/types';
import { MockAuthConnector } from '../auth/auth.spec';
import { IAuthConnector } from '../auth/auth.interface';

@injectable()
export class MocksSitesConnector implements ISitesConnector {
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
    container.rebind<MocksSitesConnector>(Types.SitesConnector)
        .to(MocksSitesConnector);
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
