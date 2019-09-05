import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    user: User!
  }

  extend type Mutation {
    "set the site of user"
    setSite(siteId: ID!): User
  }
  extend type Mutation {
    "set the site of user"
    setLifeStage(lifeStage: LifeStageInput): User
  }

  type User @cacheControl(scope: PRIVATE) {
    id: ID!
    site: Site
    groups: [Group!]
    lifeStage: LifeStage
    contact: Contact
  }

  type Contact {
    nickName: String!
    firstName: String!
  }
`;
