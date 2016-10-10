import { Map } from 'core-js';

import { injectableMetadataKey, injectOverridesMetadataKey } from './decorators';
import { InstanceManager, SingletonInstanceManager, PerResolutionInstanceManager, PerDependencyInstanceManager, AnonymousInstanceManager } from './instance-managers';
import { FactoryToken, ClassFactory, Type, InjectableConfig, InstanceMode } from './interfaces';

export class Injector {
    factories: Map<FactoryToken, InstanceManager>;
    
    constructor() {
        this.factories = new Map<any, InstanceManager>();
    }
    
    registerType(Class: Type, config: InjectableConfig) {
        if (this.factories.has(Class)) {
            return;
        }

        let parameters = this.getParameterMetadata(Class);
        this.registerInjectableDependencies(...parameters);
        
        let overrides: FactoryToken[] = Reflect.getMetadata(injectOverridesMetadataKey, Class) || [];

        let instanceManager: InstanceManager;
        
        if (config.instanceMode === InstanceMode.SingleInstance) {
            instanceManager = new SingletonInstanceManager(Class, parameters, overrides, token => this.getPrivate(token))
        } else if (config.instanceMode === InstanceMode.InstancePerResolution) {
            instanceManager = new PerResolutionInstanceManager(Class, parameters, overrides, token => this.getPrivate(token))
        } else {
            instanceManager = new PerDependencyInstanceManager(Class, parameters, overrides, token => this.getPrivate(token))
        }
        this.registerFactory(Class, instanceManager);
    }

    private getParameterMetadata(Class: Type): Type[] {
        let parameters: Type[] = Reflect.getMetadata('design:paramtypes', Class);
        return parameters || [];
    }
    
    private registerInjectableDependencies(...parameters: Type[]) {
        parameters.forEach(ParamClass => {
            let injectableConfig = Reflect.getMetadata(injectableMetadataKey, ParamClass);
            if (injectableConfig) {
                this.registerType(ParamClass, injectableConfig);
            }
        });
    }

    registerFactory(token: FactoryToken, instanceManager: InstanceManager, overwrite?: boolean): void;
    registerFactory(token: FactoryToken, factory: ClassFactory, overwrite?: boolean): void;
    registerFactory(token: FactoryToken, factory: ClassFactory | InstanceManager, overwrite?: boolean) {
        if (this.factories.has(token) && !overwrite) {
            return;
        }

        let instanceManager: InstanceManager;
        if (factory instanceof InstanceManager) {
            instanceManager = factory;
        } else {
            instanceManager = new AnonymousInstanceManager(factory);
        }

        this.factories.set(token, instanceManager);
    }

    get(token: FactoryToken): any {
        if (!this.factories.has(token) && typeof token !== 'string' && typeof token !== 'symbol') {
            this.registerType(token, { instanceMode: InstanceMode.InstancePerDependency });
        }

        this.resetFactories();
        return this.getPrivate(token);
    }

    private resetFactories(): void {
        this.factories.forEach((instanceManager) => {
            if (instanceManager instanceof PerResolutionInstanceManager) {
                instanceManager.reset();
            }
        });
    }

    private getPrivate(token: FactoryToken): any {
        let factory: InstanceManager = this.factories.get(token);
        return factory.getInstance();
    }
}
