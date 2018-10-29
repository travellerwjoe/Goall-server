const { ApolloServer, gql } = require('apollo-server-koa')

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
  type __Schema {
    types: [__Type!]!
    queryType: __Type!
    mutationType: __Type
    subscriptionType: __Type
    directives: [__Directive!]!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    mocks: true,
    formatResponse: (response) => {
        console.info('graphql response:', JSON.stringify(response))
        return response
    },
    formatError: error => {
        console.error('graphql error:', error)
        return error
    }
})

module.exports = server