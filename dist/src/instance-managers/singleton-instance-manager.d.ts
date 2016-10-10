import { PerDependencyInstanceManager } from './per-dependency-instance-manager';
import { Type, FactoryToken } from '../interfaces';
export declare class SingletonInstanceManager extends PerDependencyInstanceManager {
    protected instance: Object;
    constructor(Class: Type, parameters: Type[], overrides: FactoryToken[], injectType: (token: FactoryToken) => any);
    getInstance(): Object;
}
