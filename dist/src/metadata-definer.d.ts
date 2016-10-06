import 'reflect-metadata';
import { Injector } from './injector';
export declare class MetadataDefiner {
    private injector;
    constructor(injector?: Injector);
    defineDependencies(Class: any, dependencies: any[], singleton?: boolean): void;
}
