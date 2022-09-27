"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_1 = __importDefault(require("./apollo-server"));
const expressApp = (0, express_1.default)();
(0, apollo_server_1.default)(expressApp).then(() => { });
