import { gql } from 'apollo-server-express';

export default gql`
  type Group {
    id: ID!
    name: String!
    role: GroupRole!
    type: GroupType!
    meeting: Meeting!
  }

  type GroupType {
    id: Int!
    name: String!
  }

  type GroupRole {
    id: Int!
    name: String!
  }

  type Meeting {
    day: String
    time: String
    frequency: String
  }
`;
