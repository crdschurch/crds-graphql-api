import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    sites(filter: String): [Site!]
  }

  type Site @cacheControl(scope: PUBLIC, maxAge: 10) {
   id: ID!
   name: String!
  }
`;
