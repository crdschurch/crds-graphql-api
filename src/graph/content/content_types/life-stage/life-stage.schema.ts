import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    lifeStages: [LifeStage!]
    lifeStageContent(id: String): [Media!]
  }

  type LifeStage implements Content {
    id: String!
    title: String
    description: String
    imageUrl: String!
    contentTotal: String!
    contentType: String!
  }

  input LifeStageInput {
    id: String!
    title: String
  }
  `;
