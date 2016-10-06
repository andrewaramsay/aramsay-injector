import { Map } from 'core-js';

import { InjectableConfig } from './injectable.config';
import { injectableMetadataKey } from './injectable.decorator';

export interface ClassFactory {
    (): any;
}

export class Injector {
    factories: Map<any, ClassFactory>;
    
    constructor() {
        this.factories = new Map<any, ClassFactory>();
    }
    
    registerType(Class: any, config: InjectableConfig) {
        if (this.factories.has(Class)) {
            console.warn(`Class ${Class.name} is already registered.  Ignoring`);
            return;
        }

        let parameters = this.getParameterMetadata(Class);
        this.registerInjectableDependencies(...parameters);
        
        let instance: any;
        let classFactory = () => {
            if (config.singleton && instance) {
                return instance;
            }
            
            var paramInstances = parameters.map(ParamClass => this.get(ParamClass));
            instance = new Class(...paramInstances);
            return instance;
        };

        this.registerFactory(Class, classFactory);
    }

    registerFactory(Class: any, factory: ClassFactory) {
        if (this.factories.has(Class)) {
            console.warn(`Class ${Class.name} is already registered.  Ignoring`);
            return;
        }

        this.factories.set(Class, factory);
    }
    
    private registerInjectableDependencies(...parameters: Function[]) {
        parameters.forEach(ParamClass => {
            let injectableConfig = Reflect.getMetadata(injectableMetadataKey, ParamClass);
            if (injectableConfig) {
                this.registerType(ParamClass, injectableConfig);
            }
        });
    }
    
    get(Class: any) {
        if (!this.factories.has(Class)) {
            this.registerType(Class, {});
        }

        let factory = this.factories.get(Class);
        return factory();
    }

    private getParameterMetadata(Class: any): Function[] {
        let parameters: Function[] = Reflect.getMetadata('design:paramtypes', Class);
        return parameters || [];
    }
}

