import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    lifeStages: [LifeStage!]
    lifeStageContent(filter: String): [LifeStageContent!]
  }

  type LifeStage @cacheControl(scope: PUBLIC, maxAge: 10) {
    id: String!
    title: String!
    description: String!
    imageUrl: String!
  }

  type LifeStageContent @cacheControl(scope: PUBLIC, maxAge: 10) {
    id: String!
    title: String!
    slug: String!
    imageUrl: String!
    contentType: String!
  }
`;
