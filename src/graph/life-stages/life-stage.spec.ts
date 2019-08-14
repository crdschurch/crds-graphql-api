import { injectable } from "inversify";
import { ILifeStage, ILifeStageConnector } from "./life-stage.interface";

//@injectable()
// export class MocksLifeStageConnector implements ILifeStageConnector {
//     public getLifeStages(): string {
//         return new Promise((resolve, reject) => {
//             resolve([
//                 {
//                     "title": "Married",
//                     "description": "Knot Tied",
//                     "imageUrl": "/your/image.jpg",
//                 },
//                 {
//                     "title": "Divorced",
//                     "description": "Knot Untied?",
//                     "imageUrl": "/your/image2.jpg"
//                 }
//             ])
//         });
//     }
// }
