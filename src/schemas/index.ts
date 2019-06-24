import { gql } from 'apollo-server-express';

import userSchema from './user';
import siteSchema from './site';

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

export default [linkSchema, userSchema, siteSchema];
