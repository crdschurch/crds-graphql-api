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
    //return Authentication('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ijkyc3c1bmhtbjBQS3N0T0k1YS1nVVZlUC1NWSIsImtpZCI6Ijkyc3c1bmhtbjBQS3N0T0k1YS1nVVZlUC1NWSJ9.eyJpc3MiOiJGb3JtcyIsImF1ZCI6IkZvcm1zL3Jlc291cmNlcyIsImV4cCI6MTU2MTQ5MzQzOSwibmJmIjoxNTYxNDkxNjM5LCJjbGllbnRfaWQiOiJDUkRTLkNvbW1vbiIsInNjb3BlIjpbImh0dHA6Ly93d3cudGhpbmttaW5pc3RyeS5jb20vZGF0YXBsYXRmb3JtL3Njb3Blcy9hbGwiLCJvZmZsaW5lX2FjY2VzcyIsIm9wZW5pZCJdLCJzdWIiOiJiMzI2YWVmMi03N2U3LTQwNDItYjNiMS1kNWYxMzA1MDljMmUiLCJhdXRoX3RpbWUiOjE1NjE0OTE2MzksImlkcCI6Imlkc3J2IiwibmFtZSI6ImpqYW5zc2VuQGNhbGxpYnJpdHkuY29tIiwiYW1yIjpbInBhc3N3b3JkIl19.pqWdOHGd-Aa0KcD-c6RqIvSPRM1sl6zVI1GMSApyev5Xh6lOBisML1YhDlrVjMrfZOIeRrudh2F4YfmhXAAjtAinfDBY5VaDF4JV5qgLk3EQ8K_d1nOFfWI1b6Ya1wyFdi0ppknrxVLbTUc_5JgXjyNABMCaPlcOgN8NNlcwbRSbTbWb4iQ1WDyk7fJWzP5vmbegSsoyn-zUfAVGLJ7Ge4jsyXQRSbFCCTafB_Zx_Tpf6JwrZFPVJK2ZLNTod6-jENDJhtAeoALRbGrmwy-LlATdGMJiqUvYOCXqxXNOcyyybV8RFqEPrKhLe1Qyp14mPG1pLLb0WwijEqxCfDyM4Q')
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
