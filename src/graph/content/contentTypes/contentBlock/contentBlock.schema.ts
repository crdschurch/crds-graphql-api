import { gql } from "apollo-server-express";

export default gql`

type Author implements Media {
    id: ID!
    title: String
    contentType: String!
    slug: String!
    content: String
    type: String!
    category: String!
  }
  `;
