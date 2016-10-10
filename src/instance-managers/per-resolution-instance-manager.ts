import { SingletonInstanceManager } from './singleton-instance-manager';
import { Type, FactoryToken } from '../interfaces';

export class PerResolutionInstanceManager extends SingletonInstanceManager {
    constructor(Class: Type, parameters: Type[], overrides: FactoryToken[], injectType: (token: FactoryToken) => any) {
        super(Class, parameters, overrides, injectType);
    }

    reset(): void {
        this.instance = null;
    }
}
