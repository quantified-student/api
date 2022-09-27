import { Express } from "express";

import CanvasData from "./dataSources/canvas";
import WatchData from "./dataSources/smartWatch";
import DataSource from "./dataSources/datatypes/datasource";
import { DocumentNode } from "graphql";

import loggingPlugin from "./plugins/logging";

import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";

const http = require("http");
const typeDef = gql`
  type Query
`;

const sources: DataSource[] = [WatchData, CanvasData];

const typeDefs: DocumentNode[] = [typeDef];
const resolvers: any = [];
const dataSources: any = {};

async function startApolloServer(expressApp: Express) {
  const httpServer = http.createServer(expressApp);

  // Load datasources
  sources.forEach((source: DataSource) => {
    typeDefs.push(source.typeDef);
    resolvers.push(source.resolvers);
    dataSources[source.name] = new source.dataSource();
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
      return dataSources;
    },
    context: ({ req }: any) => {
      return {
        // Req is the request object from express
        // Add headers to the context, so we can forward them in the resolvers
        Authorization: req.headers.authorization,
      };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), loggingPlugin],
  });

  await server.start();
  server.applyMiddleware({ app: expressApp });

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

export default startApolloServer;
