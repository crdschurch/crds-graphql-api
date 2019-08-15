import express from "express";
import { inject, injectable } from "inversify";
import { GraphqlServer } from "./graphql";
import { Types } from "./ioc/types";
import { Vault } from "crds-vault-node";

@injectable()
export class Server {

    public expressServer;

    constructor(
        @inject(Types.GraphQLServer) private graphqlServer: GraphqlServer,
    ) {
        this.expressServer = express();
        this.graphqlServer.express = this.expressServer;
    }

    public start(): void {
        this.graphqlServer.start();
    }

    public stop(): void {
        this.graphqlServer.stop();
    }
}
