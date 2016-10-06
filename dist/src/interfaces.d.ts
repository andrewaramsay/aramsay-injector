export interface ClassFactory {
    (): any;
}
export declare type FactoryToken = Type | string | symbol;
export interface Type {
    new (...args: any[]): any;
}
export interface InjectableConfig {
    singleton?: boolean;
}
