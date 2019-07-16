import express from "express";
import { ApolloServer } from "apollo-server-express";
import { Authentication, logging } from "./config";

const app = express();

import schema from "./schemas";
import resolvers from "./resolvers";
import { testData } from "./connectors";

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || "";
    // return Authentication(token);
    return Authentication(
      `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ijkyc3c1bmhtbjBQS3N0T0k1YS1nVVZlUC1NWSIsImtpZCI6Ijkyc3c1bmhtbjBQS3N0T0k1YS1nVVZlUC1NWSJ9.eyJpc3MiOiJGb3JtcyIsImF1ZCI6IkZvcm1zL3Jlc291cmNlcyIsImV4cCI6MTU2MzI4OTY1OCwibmJmIjoxNTYzMjg3ODU4LCJjbGllbnRfaWQiOiJDUkRTLkNvbW1vbiIsInNjb3BlIjpbImh0dHA6Ly93d3cudGhpbmttaW5pc3RyeS5jb20vZGF0YXBsYXRmb3JtL3Njb3Blcy9hbGwiLCJvZmZsaW5lX2FjY2VzcyIsIm9wZW5pZCJdLCJzdWIiOiIxNTM1ZGQyZC1iZDcyLTQ2MjktOTdhOS1kMGFiNjcxYTM3ZjYiLCJhdXRoX3RpbWUiOjE1NjMyODc4NTgsImlkcCI6Imlkc3J2IiwibmFtZSI6InAuY2hyaXN0aWFuLmNyYXdmb3JkQGdtYWlsLmNvbSIsImFtciI6WyJwYXNzd29yZCJdfQ.1LTMWaPLczfa22lbc_mXbZkuNUY1da46czfG-jrpBq3vd7ZtKpWuemBpS5h_fJE7HyK8R4VlrZuT8SEwdBKYi9ahF8zAysTRWHsOj_mETWnh7siU9FQYunWQl7KA1TsvaFg7OsCefl7EjeeDkVTKl1s2yRTPUgSbE5a9-JdA_7Z8rq3hYiAtb8JNZKG-IWdA1cLSR40yj-Xx6uo6kDbNR4IThZVfiIUIDWYOnjDE6UPE4CGJrNn2UFU7VXE9f8JFNokD_jQ4PYFODIxG-ZCfNBjys1KRapWk9kOL0Pn6NIUZyBG-bRLg3W53Jo6jvma6Kmvljjg72VSx0HpP0A2HIQ`
    );
  },
  formatResponse: response => {
    logging.logResponseBody(response);
    return response;
  },
  formatError: error => {
    logging.logError(error);
    return error;
  }
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 8000 }, () => {
  console.log("Apollo Server on http://localhost:8000/graphql");
});
