import { gql } from 'apollo-server-express';

export default gql`
  type Group {
   id: ID!
   name: String!
   role: String!
   type: Int!
  }
`;
