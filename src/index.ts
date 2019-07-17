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
      `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ijkyc3c1bmhtbjBQS3N0T0k1YS1nVVZlUC1NWSIsImtpZCI6Ijkyc3c1bmhtbjBQS3N0T0k1YS1nVVZlUC1NWSJ9.eyJpc3MiOiJGb3JtcyIsImF1ZCI6IkZvcm1zL3Jlc291cmNlcyIsImV4cCI6MTU2MzM3NDU5OCwibmJmIjoxNTYzMzcyNzk4LCJjbGllbnRfaWQiOiJDUkRTLkNvbW1vbiIsInNjb3BlIjpbImh0dHA6Ly93d3cudGhpbmttaW5pc3RyeS5jb20vZGF0YXBsYXRmb3JtL3Njb3Blcy9hbGwiLCJvZmZsaW5lX2FjY2VzcyIsIm9wZW5pZCJdLCJzdWIiOiIxNTM1ZGQyZC1iZDcyLTQ2MjktOTdhOS1kMGFiNjcxYTM3ZjYiLCJhdXRoX3RpbWUiOjE1NjMzNzI3OTgsImlkcCI6Imlkc3J2IiwibmFtZSI6InAuY2hyaXN0aWFuLmNyYXdmb3JkQGdtYWlsLmNvbSIsImFtciI6WyJwYXNzd29yZCJdfQ.lYmNdqlREzg585h_DfW6Fr9DNZyVLIzLuDbJRfk5kMULNcr1nRXjGAMO0Q5yx4WcZ5Zv7zOQxAsGr-vhbK9jySZvfGM9Oj3QeIy-Xze4opOHKDXRL0x19vWbXhF1cDDWwKIEMcNjVoTIh4DD6mrOor9yjMC2aHcCmHJ7y3S9p7OT8GqvRPH2I2MVojuPt7zbxl5-TlqfpoT6AjrcR7pJKlwIL4zAX6BYhU3K3l-8RU6NWfvOAfJIEHYxSJwNs4U6XhoVd9GGchhOPBzn7gcxj0ZaJsCv6eLdQL0I822hCf7uOi_z5GdIW9_64kS_f-14STf1iREDjKStLlNv4bAItQ`
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
