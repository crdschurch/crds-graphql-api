import { gql } from 'apollo-server-express';

export default gql`
  type Group {
    id: ID!
    url: String!
    name: String!
    role: GroupRole!
    type: GroupType!
    meeting: Meeting!
    image: String #depends on leader having profile image
    endDate: String
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
