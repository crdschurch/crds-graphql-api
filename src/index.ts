import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { Authentication } from './config';

const app = express();

import schema from './schemas';
import resolvers from './resolvers';
import { testData } from './connectors';

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.Authorization || '';
    return Authentication(token);
    //return Authentication('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ijkyc3c1bmhtbjBQS3N0T0k1YS1nVVZlUC1NWSIsImtpZCI6Ijkyc3c1bmhtbjBQS3N0T0k1YS1nVVZlUC1NWSJ9.eyJpc3MiOiJGb3JtcyIsImF1ZCI6IkZvcm1zL3Jlc291cmNlcyIsImV4cCI6MTU2MTQwMTk2NSwibmJmIjoxNTYxNDAwMTY1LCJjbGllbnRfaWQiOiJDUkRTLkNvbW1vbiIsInNjb3BlIjpbIm9wZW5pZCIsIm9mZmxpbmVfYWNjZXNzIiwiaHR0cDovL3d3dy50aGlua21pbmlzdHJ5LmNvbS9kYXRhcGxhdGZvcm0vc2NvcGVzL2FsbCJdLCJzdWIiOiJiMzI2YWVmMi03N2U3LTQwNDItYjNiMS1kNWYxMzA1MDljMmUiLCJhdXRoX3RpbWUiOjE1NjEzNzg0MTUsImlkcCI6Imlkc3J2IiwibmFtZSI6ImpqYW5zc2VuQGNhbGxpYnJpdHkuY29tIiwiYW1yIjpbInBhc3N3b3JkIl19.uMYH4nPHRCcpDSkvzcblPMaW3tVdHPIag0voprn06fx0lluMJhREX5HM1rOh-i0XToyxOYT3GT7LhGtqkzq0lKZnJzufIe0nDhe7HlpF3n4w6MAPowIbPT50eczXMqZeQZeCLF1VdPqCd5Emgj90MO3IwY6XjDGeVXd4DaEtv_LO9YEpGBiZFQiB64st9EUZN3BXwJENpMly9SjRjjSJIPs3Kqxi6WzOjKqoQJ2V9dmniFAPBYXSOJXnmgMcPLqN1HYVDIRJcG5W0OWnj-HxjUXovaX1MG-Sq_x6L50m8wYDtRYhGtXsQ5RqpA_GwWg4BhGSTm83D07ipEdvdaTNTQ');
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
