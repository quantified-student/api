import  { Express } from "express";

import CanvasData from "./dataSources/canvas";
import WatchData from "./dataSources/smartWatch";
import Attendance from "./dataSources/qs-api";
import DataSource from "./dataSources/types/datasource";
import { DocumentNode } from "graphql";

import loggingPlugin from "./plugins/logging";

import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";

import cors from "cors";
import dataSharingMiddleware from "./middlewares/data-sharing.middleware";
import bodyParser from "body-parser";

const typeDef: DocumentNode = gql`
  type Query
`;

const sources: DataSource[] = [WatchData, CanvasData, Attendance];

const typeDefs: DocumentNode[] = [typeDef];
const resolvers: any = [];
const dataSources: any = {};

async function startApolloServer(expressApp: Express) {
  const httpServer = http.createServer(expressApp);

  // Load data sources
  sources.forEach((source: DataSource) => {
    typeDefs.push(source.typeDef);
    resolvers.push(source.resolvers);
    dataSources[source.name] = new source.dataSource();
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => dataSources,
    context: ({ req }: any) => {
      return {
        // Req is the request object from express
        // Add headers to the context, so we can forward them in the resolvers
        Authorization: req.headers.authorization,
      };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), loggingPlugin],
  });

  expressApp.use(cors({
    allowedHeaders: "*",
    origin: "*"
  }))

  expressApp.use(bodyParser.json())

  expressApp.use(dataSharingMiddleware);

  await server.start();
  server.applyMiddleware({ app: expressApp });



  await new Promise((resolve: any) =>
    httpServer.listen({ port: process.env.PORT || 8080 }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT || 8080}${
      server.graphqlPath
    }`
  );
}

export default startApolloServer;
