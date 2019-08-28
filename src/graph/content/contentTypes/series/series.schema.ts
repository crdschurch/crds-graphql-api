import { gql } from "apollo-server-express";

export default gql`

type Series implements Media {
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
  }
`;
