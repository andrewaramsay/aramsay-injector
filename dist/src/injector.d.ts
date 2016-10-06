import { InjectableConfig } from './injectable.config';
export interface ClassFactory {
    (): any;
}
export declare class Injector {
    factories: Map<any, ClassFactory>;
    constructor();
    registerType(Class: any, config: InjectableConfig): void;
    registerFactory(Class: any, factory: ClassFactory): void;
    private registerInjectableDependencies(...parameters);
    get(Class: any): any;
    private getParameterMetadata(Class);
}
