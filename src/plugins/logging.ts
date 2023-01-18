const loggingPlugin = {
  // Fires whenever a GraphQL request is received from a client.

  async requestDidStart() {
    // console.log('Request started! Query:\n'
    // + requestContext.request.query
    // );

    return {
      // Fires whenever Apollo Server will parse a GraphQL

      // request to create its associated document AST.

      async parsingDidStart() {
        // console.log('Parsing started!');
      },

      // Fires whenever Apollo Server will validate a

      // request's document AST against your GraphQL schema.

      async validationDidStart() {
        // console.log('Validation started!');
      },
    };
  },
};

export default loggingPlugin;
