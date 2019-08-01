
import "reflect-metadata";
import container from "./ioc/inversify.config";
import { Types } from "./ioc/types";
import { Server } from "./server";
import { Vault } from "crds-vault-node";

(async () => {
    try {
        await new Vault(process.env.ENV).process(['common', 'graphql']);
        const server = container.get<Server>(Types.Server).start();
    } catch (e) {
        // Deal with the fact the chain failed
    }
})();
