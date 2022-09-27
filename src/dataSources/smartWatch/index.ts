import DataSource from "../datatypes/datasource";
import typeDef from "./typeDef";

const { WatchDataApi } = require("./watch-api");
const { resolvers } = require("./resolvers");

export default new DataSource("watchData", WatchDataApi, resolvers, typeDef);
