"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = __importDefault(require("./dataSources/canvas"));
const smartWatch_1 = __importDefault(require("./dataSources/smartWatch"));
const logging_1 = __importDefault(require("./plugins/logging"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const http = require("http");
const typeDef = (0, apollo_server_express_1.gql) `
  type Query
`;
const sources = [smartWatch_1.default, canvas_1.default];
const typeDefs = [typeDef];
const resolvers = [];
const dataSources = {};
function startApolloServer(expressApp) {
    return __awaiter(this, void 0, void 0, function* () {
        const httpServer = http.createServer(expressApp);
        // Load datasources
        sources.forEach((source) => {
            typeDefs.push(source.typeDef);
            resolvers.push(source.resolvers);
            dataSources[source.name] = new source.dataSource();
        });
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs,
            resolvers,
            dataSources: () => {
                return dataSources;
            },
            context: ({ req }) => {
                return {
                    // Req is the request object from express
                    // Add headers to the context, so we can forward them in the resolvers
                    Authorization: req.headers.authorization,
                };
            },
            plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }), logging_1.default],
        });
        yield server.start();
        server.applyMiddleware({ app: expressApp });
        yield new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}
exports.default = startApolloServer;
