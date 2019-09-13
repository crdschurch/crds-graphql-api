import { Container } from "inversify";
import "reflect-metadata";
import { UsersConnector } from "../graph/users/users.connector";
import { GroupsConnector } from "../graph/groups/groups.connector";
import { GraphqlServer } from "../graphql";
import { Server } from "../server";
import { Types } from "./types";
import { AuthConnector } from "../graph/auth/auth.connector";
import { SitesConnector } from "../graph/sites/sites.connector";
import { Mongo } from "../sources/mongo";
import { ContentService } from "../sources/content";
import { Analytics } from "../config/analytics";
import { Logger } from "../config/logging";
import { ContentConnector } from "../graph/content/content.connector";

var container = new Container();

container.bind<Server>(Types.Server).to(Server);
container.bind<GraphqlServer>(Types.GraphQLServer).to(GraphqlServer).inSingletonScope();
container.bind<UsersConnector>(Types.UsersConnector).to(UsersConnector);
container.bind<GroupsConnector>(Types.GroupsConnector).to(GroupsConnector);
container.bind<AuthConnector>(Types.AuthConnector).to(AuthConnector);
container.bind<SitesConnector>(Types.SitesConnector).to(SitesConnector);
container.bind<ContentConnector>(Types.ContentConnector).to(ContentConnector);
container.bind<Mongo>(Types.Mongo).to(Mongo);
container.bind<ContentService>(Types.ContentService).to(ContentService);
container.bind<Analytics>(Types.Analytics).to(Analytics);
container.bind<Logger>(Types.Logger).to(Logger);

export default container;
