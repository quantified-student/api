const { ApolloServer, gql } = require('apollo-server');

const MockData = require("./dataSources/mock");

const typeDef = gql`
  type Query
`;

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs: [typeDef, MockData.typeDef],
    resolvers: [MockData.resolvers ],
    dataSources: () => {
        return {
            mockDataAPI: new MockData.MockDataApi()
        }
    },
    context: ({req}) => {
        return {
            // Add headers to the context, so we can forward them in the resolvers
            headers: req.headers
        }
    }
    // csrfPrevention: true,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});