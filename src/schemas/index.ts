import { gql } from 'apollo-server-express';

import userSchema from './user';
import siteSchema from './site';
import groupsSchema from './groups';

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
`;

export default [linkSchema, userSchema, siteSchema, groupsSchema];
