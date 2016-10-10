export interface ClassFactory {
    (): any;
}
export declare type FactoryToken = Type | string | symbol;
export interface Type {
    new (...args: any[]): any;
}
export declare enum InstanceMode {
    SingleInstance = 0,
    InstancePerDependency = 1,
    InstancePerResolution = 2,
}
export interface InjectableConfig {
    instanceMode?: InstanceMode;
}
