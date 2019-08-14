import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    lifeStages(filter: String): [LifeStage!]
  }

  type LifeStage @cacheControl(scope: PUBLIC, maxAge: 10) {
    title: String!
    description: String!
    imageUrl: String!
  }
`;
