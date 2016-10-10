import { InstanceManager } from './instance-manager';
import { Type, FactoryToken } from '../interfaces';

export class PerDependencyInstanceManager extends InstanceManager {
    constructor(
        protected Class: Type, 
        protected parameters: Type[], 
        protected overrides: FactoryToken[],
        protected injectType: (token: FactoryToken) => any) {
        super();
    }

    getInstance(): Object {
        let paramInstances = this.parameters.map((ParamClass, index) => {
            return this.injectType(this.overrides[index] || ParamClass);
        });
        return new this.Class(...paramInstances);
    }
}

