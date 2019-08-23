import { gql } from "apollo-server-express";

export default gql`
type Promo implements Media {
    id: String!
    title: String
    contentType: String!
    slug: String
    duration: String
    authors: [Author!]
    category: String
    imageUrl: String
    qualifiedUrl: String
    description: String
    targetAudience: [String]
  }
`;
