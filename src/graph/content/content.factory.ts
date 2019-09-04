import { IContent } from './content.interface';
import * as ContentTypes from './contentTypes';
import camelCase from 'camelcase';

export class ContentFactory {
    public static instantiate(entry: any): IContent {
        const className = camelCase(entry.sys.contentType.sys.id, {pascalCase: true});
        return new ContentTypes[className](entry);
    }
}
