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
    return Authentication(token);
    // return Authentication(
    //   `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ijkyc3c1bmhtbjBQS3N0T0k1YS1nVVZlUC1NWSIsImtpZCI6Ijkyc3c1bmhtbjBQS3N0T0k1YS1nVVZlUC1NWSJ9.eyJpc3MiOiJGb3JtcyIsImF1ZCI6IkZvcm1zL3Jlc291cmNlcyIsImV4cCI6MTU2MzM3OTcyNSwibmJmIjoxNTYzMzc3OTI1LCJjbGllbnRfaWQiOiJDUkRTLkNvbW1vbiIsInNjb3BlIjpbImh0dHA6Ly93d3cudGhpbmttaW5pc3RyeS5jb20vZGF0YXBsYXRmb3JtL3Njb3Blcy9hbGwiLCJvZmZsaW5lX2FjY2VzcyIsIm9wZW5pZCJdLCJzdWIiOiIxNTM1ZGQyZC1iZDcyLTQ2MjktOTdhOS1kMGFiNjcxYTM3ZjYiLCJhdXRoX3RpbWUiOjE1NjMzNzc5MjUsImlkcCI6Imlkc3J2IiwibmFtZSI6InAuY2hyaXN0aWFuLmNyYXdmb3JkQGdtYWlsLmNvbSIsImFtciI6WyJwYXNzd29yZCJdfQ.a5YKJvrO2mrKkWfznrUExSpGp-E6zb6Vlb8mJsKAcCRFsqzeYR-mlfocf0x9Q17kOL15c_HWXZSFvoVTkea28RqK18TWUfB06ldOy4qAPbp-GcT2RzX8F_DUz1o8WSdz7VTgnUH7l-yD29Kc7KwhD_i1P1Vepes2SHX2DfkBIzuOqq3LmWGPIsjgvuB6sKKoyjWrpW_4yEZjV367saoe5TwTGqWrdwaLqEaoVwrRcrb-ff7e2UtOc2_rimOmQUVYj_bo5rNOAaBtDFoMhUCY6WO67OkSImExbDyBXaty9YaZz7v8yRRoSnCu2Y2AdTVnwyCIoiv4tBtV3vdoKgaBeg`
    // );
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
