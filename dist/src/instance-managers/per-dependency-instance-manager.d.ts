import { InstanceManager } from './instance-manager';
import { Type, FactoryToken } from '../interfaces';
export declare class PerDependencyInstanceManager extends InstanceManager {
    protected Class: Type;
    protected parameters: Type[];
    protected overrides: FactoryToken[];
    protected injectType: (token: FactoryToken) => any;
    constructor(Class: Type, parameters: Type[], overrides: FactoryToken[], injectType: (token: FactoryToken) => any);
    getInstance(): Object;
}
