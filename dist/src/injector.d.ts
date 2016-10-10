import { InstanceManager } from './instance-managers';
import { FactoryToken, ClassFactory, Type, InjectableConfig } from './interfaces';
export declare class Injector {
    factories: Map<FactoryToken, InstanceManager>;
    constructor();
    registerType(Class: Type, config: InjectableConfig): void;
    private getParameterMetadata(Class);
    private registerInjectableDependencies(...parameters);
    registerFactory(token: FactoryToken, instanceManager: InstanceManager, overwrite?: boolean): void;
    registerFactory(token: FactoryToken, factory: ClassFactory, overwrite?: boolean): void;
    get(token: FactoryToken): any;
    private resetFactories();
    private getPrivate(token);
}
