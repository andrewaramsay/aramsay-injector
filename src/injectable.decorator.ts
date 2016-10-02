import { Injector, InjectableConfig } from './injector';

export function Injectable(config?: InjectableConfig): ClassDecorator {
    let injectorInstance = Injector.instance;
    return function(Class: FunctionConstructor) {
        injectorInstance.registerType(Class, config || {});
    }
}