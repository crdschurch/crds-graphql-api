import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    sites: [Site!]
  }

  type Site @cacheControl(scope: PUBLIC, maxAge: 86400) {
   id: ID!
   name: String!
  }
`;
