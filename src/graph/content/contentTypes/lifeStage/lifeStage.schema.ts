import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    lifeStages: [LifeStage!]
  }

  type LifeStage implements Content {
    id: ID!
    title: String
    description: String
    imageUrl: String!
    contentTotal: String!
    contentType: String!
    content: [LifeStageContent]
  }

  type LifeStageContent implements Media {
    id: ID!
    title: String
    contentType: String!
    slug: String
    duration: String
    authors: [Author!]
    category: String
    imageUrl: String
    qualifiedUrl: String
    description: String
    lifeStageid: ID!
  }

  input LifeStageInput {
    id: ID!
    title: String
  }
  `;
