import { injectable } from "inversify";
import { ILifeStage, ILifeStageConnector, ILifeStageContent } from "./life-stage.interface";
import { ApolloServer } from "apollo-server-express";
import schema from "../../schema";
import resolvers from "../../resolvers";
import { MockAuthConnector } from "../auth/auth.spec";
import { createTestClient } from "apollo-server-testing";

@injectable()
export class MocksLifeStageConnector implements ILifeStageConnector {
  public getLifeStages(): Promise<ILifeStage[]> {
    return new Promise((resolve, reject) => {
      resolve([
        {
          "title": "Married",
          "description": "Knot Tied",
          "imageUrl": "/your/image.jpg",
          "id": "id1",
          "contentTotal": "1"
        },
        {
          "title": "Divorced",
          "description": "Knot Untied?",
          "imageUrl": "/your/image2.jpg",
          "id": "id2",
          "contentTotal": "4"
        }
      ])
    });
  }

  public getLifeStageContent(id): Promise<ILifeStageContent[]> {
    return new Promise((resolve, reject) => {
      resolve([
        {
          "id": "id1",
          "contentType": "contentType1",
          "imageUrl": "/your/image1.jpg",
          "slug": "slug1",
          "title": "title1",
          "duration": 1234,
          "authors": ["author1"],
          "category": "category1"
          
        },
        {
          "id": "id2",
          "contentType": "contentType2",
          "imageUrl": "/your/image2.jpg",
          "slug": "slug2",
          "title": "title2",
          "duration": 5678,
          "authors": ["author2"],
          "category": "category2"
        }
      ])
    });
  }
}

it('fetches life stage data', async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers,
    context: () => (new MockAuthConnector().authenticate('fakeToken')),
    dataSources: (): any => ({ lifeStageConnector: new MocksLifeStageConnector() })
  });

  const { query } = createTestClient(server);
  const res = await query({
    query: `{
          lifeStages {
              id
              title
              description
              imageUrl
              contentTotal
          }
        }
        ` });

  expect(res.data).toMatchObject({
    lifeStages: [
      {
        "title": "Married",
        "description": "Knot Tied",
        "imageUrl": "/your/image.jpg",
        "id": "id1",
        "contentTotal": "1"
      },
      {
        "title": "Divorced",
        "description": "Knot Untied?",
        "imageUrl": "/your/image2.jpg",
        "id": "id2",
        "contentTotal": "4"
      }
    ]
  });
});

it('fetches life stage content', async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers,
    context: () => (new MockAuthConnector().authenticate('fakeToken')),
    dataSources: (): any => ({ lifeStageConnector: new MocksLifeStageConnector() })
  });

  const { query } = createTestClient(server);
  const res = await query({
    query: `{
          lifeStageContent(id: "CONTENTFUL_LIFE_STAGE_ID"){
            id
            title
            imageUrl
            slug
            contentType
          }
        }
        ` });

  expect(res.data).toMatchObject({
    lifeStageContent: [
      {
        "id": "id1",
        "contentType": "contentType1",
        "imageUrl": "/your/image1.jpg",
        "slug": "slug1",
        "title": "title1",
        "duration": 1234,
        "authors": ["author1"],
        "category": "category1"
      },
      {
        "id": "id2",
        "contentType": "contentType2",
        "imageUrl": "/your/image2.jpg",
        "slug": "slug2",
        "title": "title2",
        "duration": 5678,
        "authors": ["author2"],
        "category": "category2"
      }
    ]
  });
});
