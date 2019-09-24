import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import { Express } from "express";
import * as http from "http";
import { inject, injectable } from "inversify";
import { Types } from "./ioc/types";
import schema from "./schema";
import resolvers from "./resolvers";
import { IAuthConnector } from "./graph/auth/auth.interface";
import { IUsersAPI } from "./graph/users/users.interface";
import { ISitesAPI } from "./graph/sites/sites.interface";
import { RedisCache } from "apollo-server-cache-redis";
import responseCachePlugin from "apollo-server-plugin-response-cache";
import { Analytics } from "./config/analytics";
import { Logger } from "./config/logging";
import { IContentConnector } from "./graph/content/content.interface";
import { IGroupsAPI } from "./graph/groups/groups.interface";
import { IDataSources } from "./graph/context/context.interface";
import { Mongo } from "./sources/mongo";
import { UsersMongo } from "./graph/users/users.mongo";
import { UsersAPI } from "./graph/users/users.api";
import { SitesAPI } from "./graph/sites/sites.api";
import { GroupsAPI } from "./graph/groups/groups.api";
import { IMPAuth } from "./sources/mp";

@injectable()
export class GraphqlServer {
  public set express(v: Express) {
    this.app = v;
  }
  private app: Express;
  private serverInstance: http.Server;

  constructor(
    @inject(Types.AuthConnector) private authAPI: IAuthConnector,
    @inject(Types.ContentConnector) private contentConnector: IContentConnector,
    @inject(Types.Analytics) private analytics: Analytics,
    @inject(Types.Logger) private logger: Logger,
    @inject(Types.MPAuth) private mpAuth: IMPAuth,
  ) {}

  public async start(): Promise<void> {
    let app = this.app;

    const usersCollection = await Mongo.getCollection("users");

    const server = new ApolloServer({
      schema: makeExecutableSchema({
        typeDefs: schema,
        resolvers,
        inheritResolversFromInterfaces: true
      }),
      context: ({ req }) => {
        if (req.body.query.includes("IntrospectionQuery")) return;
        const token = req.headers.authorization || "";
        return this.authAPI.authenticate(token).then(user => {
          return user;
        });
      },
      dataSources: (): any => {
        return <IDataSources>{
          usersAPI: new UsersAPI(this.mpAuth),
          usersMongo: new UsersMongo({ usersCollection }),
          sitesAPI: new SitesAPI(this.mpAuth),
          groupsAPI: new GroupsAPI(this.mpAuth),
          contentConnector: this.contentConnector,
          analytics: this.analytics,
          logger: this.logger
        };
      },
      formatResponse: response => {
        this.logger.logResponseBody(response);
        return response;
      },
      formatError: error => {
        this.logger.logError(error);
        return error;
      },
      plugins: [
        responseCachePlugin({
          sessionId: requestContext => requestContext.request.http.headers.get("authorization") || null
        })
      ],
      cacheControl: {
        defaultMaxAge: 5
      },
      cache: new RedisCache(`redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}/${process.env.REDIS_DB}`)
    });

    server.applyMiddleware({ app, path: "/" });

    app.listen({ port: 8000 }, () => {
      this.mpAuth.authorize();
    });
  }

  public stop() {
    this.serverInstance.close();
  }
}
