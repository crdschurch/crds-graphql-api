import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { Authentication, logging } from './config';

const app = express();

import schema from './schemas';
import resolvers from './resolvers';
import { testData } from './connectors';

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || '';
    return Authentication(token);
  },
  formatResponse: response => {
    logging.logResponseBody(response);
    return response;
  },
  formatError: error => {
    logging.logError(error);
    return error;
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
