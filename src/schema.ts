import { gql } from "apollo-server-express";
import userSchema from "./graph/users/users.schema";
import siteSchema from "./graph/sites/sites.schema";
import groupsSchema from "./graph/groups/groups.schema";
import contentSchema from "./graph/content/content.schema";

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }

  directive @cacheControl(maxAge: Int, scope: CacheControlScope) on OBJECT | FIELD_DEFINITION

  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }
`;

export default [linkSchema, userSchema, siteSchema, groupsSchema, ...contentSchema];
