import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    sites(filter: String): [Site!]
  }

  type Site {
    id: ID!
    name: String!
  }
`;
