import { IContent } from './content.interface';
import * as ContentTypes from './content_types';

export class ContentFactory {
    public static instantiate(entry: any): IContent {
        const className = entry.sys.contentType.sys.id.replace(/^\w/, c => c.toUpperCase());
        return new ContentTypes[className](entry);
    }
}
