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
      `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ijkyc3c1bmhtbjBQS3N0T0k1YS1nVVZlUC1NWSIsImtpZCI6Ijkyc3c1bmhtbjBQS3N0T0k1YS1nVVZlUC1NWSJ9.eyJpc3MiOiJGb3JtcyIsImF1ZCI6IkZvcm1zL3Jlc291cmNlcyIsImV4cCI6MTU2MzIxODE4NSwibmJmIjoxNTYzMjE2Mzg1LCJjbGllbnRfaWQiOiJDUkRTLkNvbW1vbiIsInNjb3BlIjpbImh0dHA6Ly93d3cudGhpbmttaW5pc3RyeS5jb20vZGF0YXBsYXRmb3JtL3Njb3Blcy9hbGwiLCJvZmZsaW5lX2FjY2VzcyIsIm9wZW5pZCJdLCJzdWIiOiIxNTM1ZGQyZC1iZDcyLTQ2MjktOTdhOS1kMGFiNjcxYTM3ZjYiLCJhdXRoX3RpbWUiOjE1NjMyMTYzODUsImlkcCI6Imlkc3J2IiwibmFtZSI6InAuY2hyaXN0aWFuLmNyYXdmb3JkQGdtYWlsLmNvbSIsImFtciI6WyJwYXNzd29yZCJdfQ.lYXuvf_C9HxK8VSVn_4PXfVz4lQwDVfvtnW66RaodoiwjBwgfZeb-X4oWkgnIjmFP7CmoWFl8dGD80zvQVRf8r-rJ6SJ_z1Chdi7tHdik8ZLvsVjk1HtxIJIETOL9IoynBpBsa7n7HJ1O1x2RnY182-KSKrbRxr97bUKiK4atFduyq3aXC8IsY10eY5mOidUr--zCn4gq_6ihmMAQmjm6UdR97WJ0M6MvU-_L0cRA7mXiEBSWNtI5bEnamsOPiBlXMNehNuour82tGBs0IbjLhn5DfbnQimXoB1s0PFuqFqqwQiBuTdow0kekgiJJ03mzNGDmv8WQmsxftoZzsGtCw`
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
