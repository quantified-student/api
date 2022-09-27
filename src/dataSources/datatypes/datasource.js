"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataSource {
    constructor(name, dataSource, resolvers, typeDef) {
        this.name = name;
        this.dataSource = dataSource;
        this.resolvers = resolvers;
        this.typeDef = typeDef;
    }
}
exports.default = DataSource;
