import { InjectableConfig } from './injectable.config';
import { Injector } from './injector';

export function Injectable(config?: InjectableConfig): ClassDecorator {
    let injectorInstance = Injector.instance;
    return function(Class: any) {
        injectorInstance.registerType(Class, config || {});
    }
}