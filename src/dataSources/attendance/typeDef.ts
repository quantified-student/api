import { gql } from "apollo-server-core";
import { DocumentNode } from "graphql";

const typeDef: DocumentNode = gql`
  extend type Query {
    AttendanceData: [Datapoint]
  }

  type Datapoint {
    date: String
    attendanceHours: Float
  }
`;

export default typeDef;
