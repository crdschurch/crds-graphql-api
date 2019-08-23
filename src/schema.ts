import { gql } from 'apollo-server-express';
import userSchema from './graph/users/users.schema';
import siteSchema from './graph/sites/sites.schema';
import groupsSchema from './graph/groups/groups.schema';
import lifeStageSchema from './graph/life-stages/life-stage.schema';
import contactSchema from './graph/contact/contact.schema';
import contentSchema from './graph/content/content.schema';

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

export default [linkSchema, userSchema, siteSchema, groupsSchema, lifeStageSchema, contentSchema, contactSchema];
