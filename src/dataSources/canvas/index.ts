import DataSource from "../datatypes/datasource";
import CanvasAPI from "./canvas-api";
import resolvers from "./resolvers";
import typeDef from "./typeDef";

export default new DataSource("canvasData", CanvasAPI, resolvers, typeDef);
