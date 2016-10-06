import 'reflect-metadata';
import { InjectableConfig, Type } from './interfaces';

export const injectableMetadataKey = 'aramsay-injector:injectable';

export function Injectable(config?: InjectableConfig): ClassDecorator {
    return function(Class: Type) {
        Reflect.defineMetadata(injectableMetadataKey, config || {}, Class);
    }
}