import express, { Express } from "express";
import startApolloServer from "./apollo-server";

const expressApp: Express = express();

startApolloServer(expressApp).then(() => {});
