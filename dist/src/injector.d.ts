import { FactoryToken, ClassFactory, Type, InjectableConfig } from './interfaces';
export declare class Injector {
    factories: Map<FactoryToken, ClassFactory>;
    constructor();
    registerType(Class: Type, config: InjectableConfig): void;
    registerFactory(token: FactoryToken, factory: ClassFactory, overwrite?: boolean): void;
    private registerInjectableDependencies(...parameters);
    get(token: FactoryToken): any;
    private getParameterMetadata(Class);
}
