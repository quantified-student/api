"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const datasource_1 = __importDefault(require("../datatypes/datasource"));
const typeDef_1 = __importDefault(require("./typeDef"));
const resolvers_1 = __importDefault(require("./resolvers"));
const watch_api_1 = __importDefault(require("./watch-api"));
exports.default = new datasource_1.default("watchData", watch_api_1.default, resolvers_1.default, typeDef_1.default);
