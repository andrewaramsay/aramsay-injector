import { InjectableConfig, FactoryToken, Type } from '../interfaces';

export const injectOverridesMetadataKey = 'aramsay-injector:overrides';

export function Inject(token: FactoryToken): ParameterDecorator {
    return function(Class: Type, propertyKey: string | symbol, parameterIndex: number) {
        let overrides = Reflect.getMetadata(injectOverridesMetadataKey, Class) || [];

        if (!parameterIndex && parameterIndex !== 0) {
            throw new Error('@Inject should only be used on parameters');
        }

        overrides[parameterIndex] = token;

        Reflect.defineMetadata(injectOverridesMetadataKey, overrides, Class);
    }
}


class Sample{
    constructor(
        @Inject('asdf') private str: string
    ) {}
}