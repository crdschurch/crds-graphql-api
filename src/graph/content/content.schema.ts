import { gql } from "apollo-server-express";
import ArticleSchema from './content_types/article/article.schema';
import AuthorSchema from './content_types/author/author.schema';
import EpisodeSchema from './content_types/episode/episode.schema';
import MessageSchema from './content_types/message/message.schema';
import PodcastSchema from './content_types/podcast/podcast.schema';
import PromoSchema from './content_types/promo/promo.schema';
import Serieschema from './content_types/series/series.schema';
import VideoSchema from './content_types/video/video.schema';
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
