import { DocumentNode } from "graphql";
import { gql } from "apollo-server-express";

const typeDef: DocumentNode = gql`
  type DataPoint {
    value: Int
    timestamp: String
  }

  type GraphData {
    name: String
    valueType: String
    datapoints: [DataPoint]
  }

  type WatchData {
    heartRateData: GraphData
    stressData: GraphData
  }

  extend type Query {
    WatchData: WatchData
  }
`;

export default typeDef;
