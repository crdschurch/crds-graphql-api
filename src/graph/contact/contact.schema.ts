import { gql } from 'apollo-server-express';

 export default gql`
  type Contact {
    nickName: String!
    firstName: String!
  }
`;
