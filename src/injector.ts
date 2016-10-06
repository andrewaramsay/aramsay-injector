import { Map } from 'core-js';

import { injectableMetadataKey } from './injectable.decorator';
import { injectOverridesMetadataKey } from './inject.decorator';
import { FactoryToken, ClassFactory, Type, InjectableConfig } from './interfaces';

export class Injector {
    factories: Map<FactoryToken, ClassFactory>;
    
    constructor() {
        this.factories = new Map<any, ClassFactory>();
    }
    
    registerType(Class: Type, config: InjectableConfig) {
        if (this.factories.has(Class)) {
            return;
        }

        let parameters = this.getParameterMetadata(Class);
        this.registerInjectableDependencies(...parameters);
        
        let overrides: FactoryToken[] = Reflect.getMetadata(injectOverridesMetadataKey, Class) || [];
        let instance: any;
        let classFactory = () => {
            if (config.singleton && instance) {
                return instance;
            }
            
            var paramInstances = parameters.map((ParamClass, index) => this.get(overrides[index] || ParamClass));
            instance = new Class(...paramInstances);
            return instance;
        };

        this.registerFactory(Class, classFactory);
    }

    registerFactory(token: FactoryToken, factory: ClassFactory, overwrite?: boolean) {
        if (this.factories.has(token) && !overwrite) {
            return;
        }

        this.factories.set(token, factory);
    }
    
    private registerInjectableDependencies(...parameters: Type[]) {
        parameters.forEach(ParamClass => {
            let injectableConfig = Reflect.getMetadata(injectableMetadataKey, ParamClass);
            if (injectableConfig) {
                this.registerType(ParamClass, injectableConfig);
            }
        });
    }
    
    get(token: FactoryToken) {
        if (!this.factories.has(token) && typeof token !== 'string' && typeof token !== 'symbol') {
            this.registerType(token, {});
        }

        let factory = this.factories.get(token);
        return factory();
    }

    private getParameterMetadata(Class: Type): Type[] {
        let parameters: Type[] = Reflect.getMetadata('design:paramtypes', Class);
        return parameters || [];
    }
}

