import { gql } from 'apollo-server-express';

export default gql`
  type Groups {
   id: ID!
   name: String!
  }
`;
