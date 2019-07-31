import { ApolloServer } from "apollo-server-express";
import { Express } from "express";
import * as http from "http";
import { inject, injectable } from "inversify";
import { Types } from "./ioc/types";
import schema from "./schema";
import resolvers from "./resolvers";
import { IAuthConnector } from "./graph/auth/auth.interface";
import * as logging from "./config/logging";
import { IUsersConnector } from "./graph/users/users.interface";
import { ISitesConnector } from "./graph/sites/sites.interface";
import { RedisCache } from "apollo-server-cache-redis";
import responseCachePlugin from "apollo-server-plugin-response-cache";

@injectable()
export class GraphqlServer {

    public set express(v: Express) {
        this.app = v;
    }
    private app: Express;
    private serverInstance: http.Server;

    constructor(
        @inject(Types.AuthConnector) private authConnector: IAuthConnector,
        @inject(Types.UsersConnector) private usersConnector: IUsersConnector,
        @inject(Types.SitesConnector) private sitesConnector: ISitesConnector
    ) { }

    public start(): void {

        let app = this.app;

        const server = new ApolloServer({
            typeDefs: schema,
            resolvers,
            context: ({ req }) => {
                const token = req.headers.authorization || ""
                return this.authConnector.authenticate(token);
            },
            dataSources: (): any => {
                return {
                    usersConnector: this.usersConnector,
                    sitesConnector: this.sitesConnector
                };
            },
            formatResponse: response => {
                logging.logResponseBody(response);
                return response;
            },
            formatError: error => {
                logging.logError(error);
                return error;
            },
            plugins: [responseCachePlugin({
                sessionId: (requestContext) => (requestContext.request.http.headers.get('authorization') || null),
              })],
            cache: new RedisCache({
                host: process.env.REDIS_HOST,
                port: '6379',
                password: process.env.REDIS_PASSWORD,
                db: process.env.REDIS_DB
              }),
        });

        server.applyMiddleware({ app, path: "/graphql" })

        app.listen({ port: 8000 }, () => {});
    }

    public stop() {
        this.serverInstance.close();
    }
}
