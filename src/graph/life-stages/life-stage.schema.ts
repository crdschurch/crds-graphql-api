import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    lifeStages: [LifeStage!]
    lifeStageContent(id: String): [LifeStageContent!]
  }

  type LifeStage @cacheControl(scope: PUBLIC, maxAge: 10) {
    id: String!
    title: String
    description: String
    imageUrl: String!
    contentTotal: String!
  }

  type LifeStageContent @cacheControl(scope: PUBLIC, maxAge: 10) {
    id: String!
    title: String
    contentType: String!
    duration: String
    authors: [Author!]
    category: String,
    slug: String,
    qualifiedUrl: String,
    imageUrl: String
  }

  input LifeStageInput {
    id: String!
    title: String
  }
`;
