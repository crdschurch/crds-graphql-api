import { gql } from "apollo-server-express";
import ArticleSchema from './content_types/article/article.schema';
import AuthorSchema from './content_types/author/author.schema';
import EpisodeSchema from './content_types/Episode/Episode.schema';
import MessageSchema from './content_types/Message/Message.schema';
import PodcastSchema from './content_types/Podcast/Podcast.schema';
import PromoSchema from './content_types/Promo/Promo.schema';
import Serieschema from './content_types/Series/Series.schema';
import VideoSchema from './content_types/Video/Video.schema';
import LifeStageSchema from './content_types/life-stage/life-stage.schema';

const ContentSchema = gql`

  extend type Query {
    promos: [Promo]
  }

  interface Content {
    id: String!
    title: String
    contentType: String!
  }

  interface Media {
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
  }
`;


export default [
  ArticleSchema
  , AuthorSchema
  , EpisodeSchema
  , MessageSchema
  , PodcastSchema
  , PromoSchema
  , Serieschema
  , VideoSchema
  , LifeStageSchema,
  ContentSchema];
