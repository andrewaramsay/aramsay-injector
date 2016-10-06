import { FactoryToken, ClassFactory, Type, InjectableConfig } from './interfaces';
export declare class Injector {
    factories: Map<FactoryToken, ClassFactory>;
    constructor();
    registerType(Class: Type, config: InjectableConfig): void;
    registerFactory(Class: FactoryToken, factory: ClassFactory): void;
    private registerInjectableDependencies(...parameters);
    get(Class: FactoryToken): any;
    private getParameterMetadata(Class);
}
