import { PerDependencyInstanceManager } from './per-dependency-instance-manager';
import { Type, FactoryToken } from '../interfaces';

export class SingletonInstanceManager extends PerDependencyInstanceManager {
    protected instance: Object;
    
    constructor(Class: Type, parameters: Type[], overrides: FactoryToken[], injectType: (token: FactoryToken) => any) {
        super(Class, parameters, overrides, injectType);
    }

    getInstance(): Object {
        if (!this.instance) {
            this.instance = super.getInstance();
        }

        return this.instance;
    }
}
