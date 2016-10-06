import 'reflect-metadata';
import { InjectableConfig } from './injectable.config';

export const injectableMetadataKey = 'aramsay-injector:injectable';

export function Injectable(config?: InjectableConfig): ClassDecorator {
    return function(Class: any) {
        Reflect.defineMetadata(injectableMetadataKey, config || {}, Class);
    }
}