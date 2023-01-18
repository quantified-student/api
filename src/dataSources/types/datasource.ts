import { DocumentNode } from "graphql";
import Resolver from "./resolver";

interface DataSourceShape {
  name: string;
  dataSource: any;
  resolvers: Resolver;
  typeDef: DocumentNode;
}

class DataSource implements DataSourceShape {
  constructor(
    name: string,
    dataSource: any,
    resolvers: Resolver,
    typeDef: DocumentNode
  ) {
    this.name = name;
    this.dataSource = dataSource;
    this.resolvers = resolvers;
    this.typeDef = typeDef;
  }

  name: string;
  dataSource: any;
  resolvers: Resolver;
  typeDef: DocumentNode;
}

export default DataSource;
