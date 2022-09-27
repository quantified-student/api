"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDef = (0, apollo_server_express_1.gql) `
    type GraphData {
        name: String
        valueType: String
        datapoints: [DataPoint]
    }

    type DataPoint {
        value: Int
        timestamp: String
    }

    type WatchData {
        HeartRateData: GraphData
        StressData: GraphData
    }

    extend type Query {
        WatchData: WatchData
    }
`;
exports.default = typeDef;
