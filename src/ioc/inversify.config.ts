import { Container } from "inversify";
import "reflect-metadata";
import { UsersConnector } from "../graph/users/users.connector";
import { GraphqlServer } from "../graphql";
import { Server } from "../server";
import { Types } from "./types";
import { AuthConnector } from "../graph/auth/auth.connector";
import { SitesConnector } from "../graph/sites/sites.connector";
import { LifeStageConnector } from "../graph/life-stages/life-stage.connector";
import { Mongo } from "../sources/mongo";

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
    .to(SitesConnector);
container.bind<LifeStageConnector>(Types.LifeStageConnector)
    .to(LifeStageConnector);
container.bind<Mongo>(Types.Mongo)
    .to(Mongo);

export default container;
