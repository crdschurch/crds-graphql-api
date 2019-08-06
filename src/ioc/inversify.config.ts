import { Container } from "inversify";
import "reflect-metadata";
import { UsersConnector } from "../graph/users/users.connector";
import { GraphqlServer } from "../graphql";
import { Server } from "../server";
import { Types } from "./types";
import { AuthConnector } from "../graph/auth/auth.connector";
import { SitesConnector } from "../graph/sites/sites.connector";

var container = new Container();

container.bind<Server>(Types.Server)
    .to(Server);
container.bind<GraphqlServer>(Types.GraphQLServer)
    .to(GraphqlServer)
    .inSingletonScope();
container.bind<UsersConnector>(Types.UsersConnector)
    .to(UsersConnector);
container.bind<AuthConnector>(Types.AuthConnector)
    .to(AuthConnector);
container.bind<SitesConnector>(Types.SitesConnector)
    .to(SitesConnector)

export default container;
