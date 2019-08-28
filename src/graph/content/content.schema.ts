import { gql } from "apollo-server-express";
import ArticleSchema from './contentTypes/article/article.schema';
import AuthorSchema from './contentTypes/author/author.schema';
import EpisodeSchema from './contentTypes/episode/episode.schema';
import MessageSchema from './contentTypes/message/message.schema';
import PodcastSchema from './contentTypes/podcast/podcast.schema';
import PromoSchema from './contentTypes/promo/promo.schema';
import Serieschema from './contentTypes/series/series.schema';
import VideoSchema from './contentTypes/video/video.schema';
import LifeStageSchema from './contentTypes/lifeStage/lifeStage.schema';

const ContentSchema = gql`

  extend type Query {
    promos: [Promo]
  }

  interface Content {
    id: ID!
    title: String
    contentType: String!
  }

  interface Media {
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
