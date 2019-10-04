import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    sites(availableOnline: Boolean): [Site!]
  }

  type Site {
    id: ID!
    name: String!
  }
`;
