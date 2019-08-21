import { gql } from "apollo-server-express";

export default gql`
  type Author {
    fullName: String
    references: References
  }

  type References {
    qualifiedUrl: String!
    imageUrl: String!
  }
`;
