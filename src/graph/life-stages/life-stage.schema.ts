import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    lifeStages: [LifeStage!]
    lifeStageContent(id: String): [Content!]
  }

  type LifeStage @cacheControl(scope: PUBLIC, maxAge: 10) {
    id: String!
    title: String
    description: String
    imageUrl: String!
    contentTotal: String!
  }

  input LifeStageInput {
    id: String!
    title: String
  }
`;
