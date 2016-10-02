import 'core-js';
import 'reflect-metadata';
export interface InjectableConfig {
    singleton?: boolean;
}
export declare class Injector {
    static instance: Injector;
    constructor();
    registerType(Class: any, config: InjectableConfig): void;
    get(Class: any): any;
    private checkSafeCreate(Class);
    private getParameterMetadata(Class);
}
