import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    contentBlocks(filters: ContentBlockInput): [ContentBlock]
  }

  input ContentBlockInput {
    category: String
  }

  type ContentBlock implements Content {
    id: ID!
    title: String
    contentType: String!
    slug: String!
    content: String
    type: String!
    category: String!
  }
`;
