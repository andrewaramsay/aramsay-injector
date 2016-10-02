import 'core-js';
import 'reflect-metadata';
import { InjectableConfig } from './injectable.config';
export declare const factoryMetadataKey: string;
export declare class Injector {
    static instance: Injector;
    constructor();
    registerType(Class: any, config: InjectableConfig): void;
    get(Class: any): any;
    private checkSafeCreate(Class);
    private getParameterMetadata(Class);
}
