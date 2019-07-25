
import "reflect-metadata";
import container from "./ioc/inversify.config";
import { Types } from "./ioc/types";
import { Server } from "./server";

export const server = container.get<Server>(Types.Server).start();
