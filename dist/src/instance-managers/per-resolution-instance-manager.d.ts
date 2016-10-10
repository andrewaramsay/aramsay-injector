import { SingletonInstanceManager } from './singleton-instance-manager';
import { Type, FactoryToken } from '../interfaces';
export declare class PerResolutionInstanceManager extends SingletonInstanceManager {
    constructor(Class: Type, parameters: Type[], overrides: FactoryToken[], injectType: (token: FactoryToken) => any);
    reset(): void;
}
