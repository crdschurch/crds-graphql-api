import { gql } from "apollo-server-express";

export default gql`
  type Content @cacheControl(scope: PUBLIC, maxAge: 10) {
    id: String!
    title: String
    contentType: String!
    duration: String
    authors: [Author!]
    category: String,
    slug: String,
    references: References
  }

  type Author {
    fullName: String
  }

  type References {
    qualifiedUrl: String!
    imageUrl: String!
  }
`;
