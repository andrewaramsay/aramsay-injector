import { Injector } from './injector';

export function Injectable(): ClassDecorator {
    let injectorInstance = Injector.instance;
    return function(Class: FunctionConstructor) {
        injectorInstance.registerType(Class);
    }
}