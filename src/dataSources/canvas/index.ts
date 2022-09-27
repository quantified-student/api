import DataSource from "../datatypes/datasource";

const { CanvasAPI } = require("./canvas-api");
const { resolvers } = require("./resolvers");
const { typeDef } = require("./typeDef");

export default new DataSource("canvasData", CanvasAPI, resolvers, typeDef);
