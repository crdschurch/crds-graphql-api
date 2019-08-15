import { injectable } from "inversify";
import { ILifeStageConnector, ILifeStage, ILifeStageContent } from "./life-stage.interface";
import { createClient } from "contentful";

@injectable()
export class LifeStageConnector implements ILifeStageConnector {

  public getLifeStages(): Promise<ILifeStage[]> {
    const client = createClient({
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      space: process.env.CONTENTFUL_SPACE_ID,
      environment: process.env.CONTENTFUL_ENV
    });

    return client.getEntries({content_type: 'life_stage'})
      .then(response => {
        console.log(response);
        return response.items.map((item: any) => {
          return {
            id: item.sys.id,
            title: item.fields.title,
            description: item.fields.description,
            imageUrl: item.fields.image.fields.file.url
          }
        });
      })
  }

  // public getLifeStageContent(id: string): Promise<ILifeStageContent[]> {
  //   const client = createClient({
  //     accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  //     space: process.env.CONTENTFUL_SPACE_ID,
  //     environment: process.env.CONTENTFUL_ENV
  //   });

  //   return client.getEntry(id)
  //     .then((response: any) => {
  //       console.log(response);
  //       return response.fields.items.map((item: any) => {
  //         return {
  //           id: item.sys.id
  //         }
  //       })
  //     })
  // }
}
